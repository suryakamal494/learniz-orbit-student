
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import type { ContentItem } from '@/types/lms'

interface MediaViewerProps {
  isOpen: boolean
  onClose: () => void
  content: ContentItem | null
}

const DifferentiationSlides = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0)
  
  const slides = [
    {
      title: "Slide 1: Title Slide",
      content: (
        <div className="text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-2">
            Differentiation of Algebraic Expressions
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-4">
            A Beginner's Guide
          </h2>
          <p className="text-lg text-gray-700">
            Learn the basics of how to find derivatives step-by-step
          </p>
          <div className="text-6xl mb-4">📘</div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">
              💡 <strong>Presenter's Tip:</strong> Ask: "Have you ever heard the word 'differentiation'? Let's explore what it means!"
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 2: What is Differentiation?",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">What is Differentiation?</h2>
          <div className="space-y-4 text-lg">
            <p>• Differentiation means <strong>finding the rate of change</strong> of a function.</p>
            <p>• It tells us <strong>how fast a quantity changes</strong> with respect to another.</p>
            <p>• In math: it's finding the <strong>derivative</strong>.</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Example:</h3>
            <p className="text-green-700">If y = x², how does y change when x changes?</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 italic">📈 Visual: Graph of y = x² with tangent line</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 3: Why Do We Need It?",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Why Do We Need It?</h2>
          <div className="space-y-4 text-lg">
            <p>• Used in physics (speed = rate of change of position)</p>
            <p>• Helps find slope of a curve at any point</p>
            <p>• Optimizes (max/min) real-world situations</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">Example:</h3>
            <p className="text-purple-700">If position = x², then velocity = derivative = 2x</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 italic">🏀 Visual: Ball thrown up – its height vs. time curve</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 4: Some Basic Terms",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Some Basic Terms</h2>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p><strong>Function:</strong> Like y = x² + 3x + 1</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p><strong>Variable:</strong> Usually x</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p><strong>Derivative Symbol:</strong> dy/dx or f'(x)</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 italic">🎯 Visual: Flashcards of terms</p>
            <p className="text-blue-600 font-medium mt-2">Tip: Keep the math simple and familiar</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 5: Rules of Differentiation (Basics)",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Rules of Differentiation (Basics)</h2>
          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">1. Constant Rule:</h3>
              <p className="font-mono text-lg">d/dx(5) = 0</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">2. Power Rule:</h3>
              <p className="font-mono text-lg">d/dx(x^n) = nx^(n-1)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">3. Sum Rule:</h3>
              <p className="font-mono text-lg">d/dx(f + g) = f' + g'</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Slide 6: Let's Try! One Term Only",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Let's Try! One Term Only</h2>
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-orange-800 mb-3">Expression:</h3>
            <p className="text-xl font-mono mb-4">Differentiate y = x³</p>
            <h3 className="text-lg font-semibold text-orange-800 mb-3">Solution:</h3>
            <p className="text-lg mb-2">Apply Power Rule:</p>
            <p className="text-xl font-mono text-green-700 font-bold">dy/dx = 3x²</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600 italic">📊 Visual: Show change in slope on a curve</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 7: Try with Two Terms",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Try with Two Terms</h2>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Expression:</h3>
            <p className="text-xl font-mono mb-4">Differentiate y = x³ + 2x</p>
            <h3 className="text-lg font-semibold text-purple-800 mb-3">Step-by-step:</h3>
            <div className="space-y-2 text-lg">
              <p>• d/dx(x³) = 3x²</p>
              <p>• d/dx(2x) = 2</p>
            </div>
            <p className="text-xl font-mono text-green-700 font-bold mt-4">Final Answer: dy/dx = 3x² + 2</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 font-medium">💡 Tip: Do one term at a time</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 8: Including Constants",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Including Constants</h2>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Expression:</h3>
            <p className="text-xl font-mono mb-4">Differentiate y = 4x² + 7</p>
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">Steps:</h3>
            <div className="space-y-2 text-lg">
              <p>• d/dx(4x²) = 8x</p>
              <p>• d/dx(7) = 0</p>
            </div>
            <p className="text-xl font-mono text-green-700 font-bold mt-4">Final Answer: dy/dx = 8x</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 9: Practice Time! (With Answers)",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Practice Time!</h2>
          <div className="grid gap-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-lg"><strong>Q1:</strong> y = x⁴ → ?</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-lg"><strong>Q2:</strong> y = 3x³ + 5x² + 6 → ?</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-lg"><strong>Q3:</strong> y = 7x → ?</p>
            </div>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Answers:</h3>
            <div className="space-y-2 text-lg font-mono">
              <p>1. 4x³</p>
              <p>2. 9x² + 10x</p>
              <p>3. 7</p>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-orange-800 font-medium">💡 Tip: Let students try before revealing answers</p>
          </div>
        </div>
      )
    },
    {
      title: "Slide 10: Summary & What's Next",
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Summary & What's Next</h2>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-4">You've learned:</h3>
            <div className="space-y-2 text-lg">
              <p>✔ What differentiation means</p>
              <p>✔ Basic rules</p>
              <p>✔ Step-by-step examples</p>
              <p>✔ How to find derivatives of algebraic expressions</p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">What's Next:</h3>
            <div className="space-y-2 text-lg">
              <p>• Learn <strong>product & quotient rule</strong></p>
              <p>• Try <strong>word problems</strong></p>
              <p>• See applications in physics, economics, etc.</p>
            </div>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Slide Navigation */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <Button 
          variant="outline" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="text-sm font-medium text-gray-600">
          Slide {currentSlide + 1} of {slides.length}
        </div>
        
        <Button 
          variant="outline" 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Slide Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 text-sm text-gray-500 font-medium">
            {slides[currentSlide].title}
          </div>
          {slides[currentSlide].content}
        </div>
      </div>
      
      {/* Slide Indicator Dots */}
      <div className="flex justify-center gap-2 p-4 bg-gray-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ isOpen, onClose, content }) => {
  if (!content) return null

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return videoId ? `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0` : url
  }

  const handleDownload = () => {
    if (content.type === 'pdf' && content.url) {
      const link = document.createElement('a')
      link.href = content.url
      link.download = content.title + '.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleExternalOpen = () => {
    if (content.url) {
      window.open(content.url, '_blank', 'noopener,noreferrer')
    }
  }

  const canRenderContent = () => {
    return content.type === 'youtube' || content.type === 'pdf' || content.type === 'video'
  }

  // Check if this is the Course Overview content to show slides
  const isCourseOverview = content.title.toLowerCase().includes('course overview')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">{content.title}</DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                {content.duration && <span>{content.duration}</span>}
                {content.size && <span>{content.size}</span>}
                {content.pages && <span>{content.pages} pages</span>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {content.type === 'pdf' && content.url && !isCourseOverview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
              {content.url && !isCourseOverview && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExternalOpen}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open External
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-0">
          {isCourseOverview ? (
            <DifferentiationSlides />
          ) : canRenderContent() && content.url ? (
            <>
              {content.type === 'youtube' ? (
                <iframe
                  src={getYouTubeEmbedUrl(content.url)}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={content.title}
                />
              ) : content.type === 'pdf' ? (
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center p-6">
                  <iframe
                    src={`${content.url}#view=FitH`}
                    className="w-full h-full rounded-lg border"
                    frameBorder="0"
                    title={content.title}
                    onError={() => {
                      console.warn('PDF failed to load directly, showing fallback options')
                    }}
                  />
                </div>
              ) : content.type === 'video' ? (
                <video
                  src={content.url}
                  controls
                  className="w-full h-full rounded-lg"
                  title={content.title}
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Content preview not available for this type
                </p>
                {content.url && (
                  <Button onClick={handleExternalOpen}>
                    Open in New Tab
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
