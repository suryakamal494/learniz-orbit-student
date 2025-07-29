
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"
import type { ContentItem } from '@/types/lms'

interface MediaViewerProps {
  isOpen: boolean
  onClose: () => void
  content: ContentItem | null
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
              {content.type === 'pdf' && content.url && (
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
              {content.url && (
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
        
        <div className="flex-1 p-6">
          {canRenderContent() && content.url ? (
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
                <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
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
