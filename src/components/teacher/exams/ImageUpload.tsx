
import React, { useRef, useState } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  onImageRemove: () => void
  selectedImage?: File | string
  className?: string
  label?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  onImageRemove,
  selectedImage,
  className,
  label = "Upload Image"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      onImageSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const getImageUrl = () => {
    if (!selectedImage) return null
    if (typeof selectedImage === 'string') return selectedImage
    return URL.createObjectURL(selectedImage)
  }

  const imageUrl = getImageUrl()

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {imageUrl ? (
        <div className="relative border-2 border-border rounded-lg p-4 bg-background">
          <div className="flex items-start gap-3">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {typeof selectedImage === 'string' ? 'Uploaded image' : selectedImage.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {typeof selectedImage !== 'string' && `${(selectedImage.size / 1024).toFixed(1)} KB`}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onImageRemove}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-colors",
            "hover:border-primary/50 hover:bg-accent/50",
            dragOver && "border-primary bg-accent"
          )}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-accent">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop an image here, or <span className="text-primary">browse</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Supports: JPG, JPEG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileSelect(file)
        }}
        className="hidden"
      />
    </div>
  )
}
