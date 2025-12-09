import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Presentation, Sparkles, Loader2, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Slide {
  title: string;
  content: string[];
  notes?: string;
}

interface GeneratedPresentation {
  title: string;
  slides: Slide[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
}

const subjectThemes: Record<string, { primary: string; secondary: string; gradient: string }> = {
  mathematics: { primary: "#3B82F6", secondary: "#1E40AF", gradient: "from-blue-500 to-indigo-600" },
  physics: { primary: "#8B5CF6", secondary: "#5B21B6", gradient: "from-violet-500 to-purple-600" },
  chemistry: { primary: "#10B981", secondary: "#047857", gradient: "from-emerald-500 to-teal-600" },
  biology: { primary: "#22C55E", secondary: "#15803D", gradient: "from-green-500 to-emerald-600" },
  english: { primary: "#F59E0B", secondary: "#B45309", gradient: "from-amber-500 to-orange-600" },
  history: { primary: "#EF4444", secondary: "#B91C1C", gradient: "from-red-500 to-rose-600" },
  geography: { primary: "#06B6D4", secondary: "#0E7490", gradient: "from-cyan-500 to-teal-600" },
  default: { primary: "#6366F1", secondary: "#4338CA", gradient: "from-indigo-500 to-purple-600" },
};

export default function PPTGeneratorPage() {
  const [subjectName, setSubjectName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [topicName, setTopicName] = useState("");
  const [preferences, setPreferences] = useState("");
  const [slideCount, setSlideCount] = useState("10");
  const [isGenerating, setIsGenerating] = useState(false);
  const [presentation, setPresentation] = useState<GeneratedPresentation | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getSubjectTheme = (subject: string) => {
    const normalizedSubject = subject.toLowerCase().trim();
    return subjectThemes[normalizedSubject] || subjectThemes.default;
  };

  const handleGenerate = async () => {
    if (!subjectName.trim() || !chapterName.trim() || !topicName.trim()) {
      toast.error("Please fill in Subject, Chapter, and Topic name");
      return;
    }

    setIsGenerating(true);
    setPresentation(null);
    setCurrentSlide(0);

    try {
      const { data, error } = await supabase.functions.invoke("generate-ppt", {
        body: {
          subjectName,
          chapterName,
          topicName,
          preferences,
          slideCount: parseInt(slideCount),
        },
      });

      if (error) throw error;

      if (data?.presentation) {
        setPresentation(data.presentation);
        toast.success("Presentation generated successfully!");
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (error) {
      console.error("Error generating presentation:", error);
      toast.error("Failed to generate presentation. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const nextSlide = () => {
    if (presentation && currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const theme = getSubjectTheme(subjectName);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${theme.gradient} shadow-lg`}>
            <Presentation className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">AI Presentation Generator</h1>
            <p className="text-slate-600">Create stunning educational presentations with AI</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Form */}
          <Card className="lg:col-span-1 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles className="h-5 w-5 text-amber-500" />
                Presentation Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Name *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="border-slate-200 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chapter">Chapter Name *</Label>
                <Input
                  id="chapter"
                  placeholder="e.g., Quadratic Equations"
                  value={chapterName}
                  onChange={(e) => setChapterName(e.target.value)}
                  className="border-slate-200 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic Name *</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Solving by Factorization"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  className="border-slate-200 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slides">Number of Slides</Label>
                <Select value={slideCount} onValueChange={setSlideCount}>
                  <SelectTrigger className="border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Slides</SelectItem>
                    <SelectItem value="10">10 Slides</SelectItem>
                    <SelectItem value="15">15 Slides</SelectItem>
                    <SelectItem value="20">20 Slides</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferences">Content Preferences (Optional)</Label>
                <Textarea
                  id="preferences"
                  placeholder="Describe what you want to focus on, include examples, difficulty level, etc."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  rows={4}
                  className="border-slate-200 focus:border-primary resize-none"
                />
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full bg-gradient-to-r ${theme.gradient} hover:opacity-90 text-white shadow-lg`}
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
          <Card className={`lg:col-span-2 shadow-lg border-0 bg-white/80 backdrop-blur-sm ${isFullscreen ? 'fixed inset-4 z-50 lg:col-span-1' : ''}`}>
            <CardHeader className="pb-4 flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Presentation Preview</CardTitle>
              {presentation && (
                <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                  <Maximize2 className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex flex-col items-center justify-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-slate-600 font-medium">Creating your presentation...</p>
                  <p className="text-slate-500 text-sm">This may take a moment</p>
                </div>
              ) : presentation ? (
                <div className="space-y-4">
                  {/* Slide Display */}
                  <div 
                    className="aspect-video rounded-xl overflow-hidden shadow-xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` 
                    }}
                  >
                    <div className="h-full w-full p-6 md:p-10 flex flex-col text-white">
                      {currentSlide === 0 ? (
                        // Title Slide
                        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                            {presentation.title}
                          </h1>
                          <div className="text-lg md:text-xl opacity-90">
                            {chapterName} - {topicName}
                          </div>
                          <div className="text-sm md:text-base opacity-75 mt-4">
                            {subjectName}
                          </div>
                        </div>
                      ) : (
                        // Content Slides
                        <div className="flex-1 flex flex-col">
                          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 drop-shadow-md">
                            {presentation.slides[currentSlide].title}
                          </h2>
                          <div className="flex-1 overflow-auto">
                            <ul className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg">
                              {presentation.slides[currentSlide].content.map((point, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <span className="w-2 h-2 rounded-full bg-white/80 mt-2 flex-shrink-0" />
                                  <span className="drop-shadow-sm">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {/* Slide Number */}
                      <div className="text-center text-sm opacity-75 mt-4">
                        {currentSlide + 1} / {presentation.slides.length}
                      </div>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    {/* Slide Thumbnails */}
                    <div className="hidden md:flex items-center gap-2 overflow-x-auto max-w-md">
                      {presentation.slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-8 h-6 rounded text-xs font-medium transition-all ${
                            currentSlide === index
                              ? 'bg-primary text-white scale-110'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={nextSlide}
                      disabled={currentSlide === presentation.slides.length - 1}
                      className="gap-2"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex flex-col items-center justify-center gap-4 text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center">
                    <Presentation className="h-10 w-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-700">No Presentation Yet</h3>
                  <p className="text-slate-500 max-w-sm">
                    Fill in the details and click "Generate Presentation" to create your AI-powered slides
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
