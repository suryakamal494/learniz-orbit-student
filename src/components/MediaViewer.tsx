
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, AlertCircle } from "lucide-react"

interface MediaViewerProps {
  isOpen: boolean
  onClose: () => void
  content: {
    id: string
    title: string
    type: 'video' | 'reading' | 'pdf' | 'pdf-collection'
    url?: string
    size?: string
    pages?: number
    duration?: string
  } | null
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ isOpen, onClose, content }) => {
  const [pdfError, setPdfError] = useState(false)

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
      link.target = '_blank'
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

  const handlePdfError = () => {
    setPdfError(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-4 sm:p-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">{content.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                {content.duration && <span>{content.duration}</span>}
                {content.size && <span>{content.size}</span>}
                {content.pages && <span>{content.pages} pages</span>}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {content.type === 'pdf' && content.url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  className="flex items-center gap-2 h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                >
                  <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              )}
              {content.url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExternalOpen}
                  className="flex items-center gap-2 h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Open External</span>
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-4 sm:p-6">
          {content.type === 'video' && content.url ? (
            <iframe
              src={getYouTubeEmbedUrl(content.url)}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={content.title}
            />
          ) : content.type === 'pdf' && content.url ? (
            <>
              {!pdfError ? (
                <iframe
                  src={`${content.url}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full rounded-lg border"
                  frameBorder="0"
                  title={content.title}
                  onError={handlePdfError}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg border">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Unable to display PDF</h3>
                  <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
                    This PDF cannot be displayed inline due to browser security restrictions. 
                    Please use the buttons above to download or open in a new tab.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleDownload} className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={handleExternalOpen} className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : content.type === 'reading' ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted rounded-lg border">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Reading Material</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This is a reading material. Content will be displayed here.
                </p>
                {content.url && (
                  <Button onClick={handleExternalOpen} className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open Reading Material
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted rounded-lg border">
              <p className="text-muted-foreground">Content type not supported</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
