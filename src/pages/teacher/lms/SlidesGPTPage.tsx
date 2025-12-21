import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Presentation, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const classOptions = [
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", 
  "Class 11", "Class 12"
];

export default function SlidesGPTPage() {
  const [title, setTitle] = useState("");
  const [className, setClassName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [detailedRequirements, setDetailedRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleGenerate = async () => {
    if (!title || !className || !chapterName || !topicName) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setEmbedUrl(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-slidesgpt', {
        body: {
          title,
          className,
          chapterName,
          topicName,
          detailedRequirements,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate presentation');
      }

      setEmbedUrl(data.embedUrl);
      toast.success("Presentation generated successfully!");
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error(error instanceof Error ? error.message : "Failed to generate presentation");
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Pro AI Slides
            </h1>
            <p className="text-muted-foreground text-sm">
              Powered by SlidesGPT
            </p>
          </div>
        </div>
      </div>

      {/* Fullscreen Viewer */}
      {isFullscreen && embedUrl && (
        <div className="fixed inset-0 z-50 bg-black">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allowFullScreen
            title="Generated Presentation"
          />
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <Card className="shadow-modern border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Presentation className="h-5 w-5 text-primary" />
              Presentation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Photosynthesis"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select value={className} onValueChange={setClassName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classOptions.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter Name *</Label>
              <Input
                id="chapter"
                placeholder="e.g., Life Processes"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic Name *</Label>
              <Input
                id="topic"
                placeholder="e.g., Nutrition in Plants"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Detailed Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Describe what you want in the presentation. Include specific topics to cover, examples needed, difficulty level, number of slides, etc."
                value={detailedRequirements}
                onChange={(e) => setDetailedRequirements(e.target.value)}
                rows={4}
              />
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating Presentation...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Presentation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Presentation Viewer */}
        <Card className="shadow-modern border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Presentation className="h-5 w-5 text-primary" />
                Presentation Viewer
              </CardTitle>
              {embedUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="gap-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  Fullscreen
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="aspect-video bg-muted rounded-xl flex flex-col items-center justify-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <div className="text-center">
                  <p className="font-semibold text-foreground">Generating your presentation...</p>
                  <p className="text-sm text-muted-foreground">This may take a minute</p>
                </div>
              </div>
            ) : embedUrl ? (
              <iframe
                src={embedUrl}
                className="w-full aspect-video rounded-xl shadow-xl"
                allowFullScreen
                title="Generated Presentation"
              />
            ) : (
              <div className="aspect-video bg-muted/50 rounded-xl flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border">
                <div className="p-4 rounded-full bg-muted">
                  <Presentation className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">No presentation yet</p>
                  <p className="text-sm text-muted-foreground">Fill in the details and click Generate</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
