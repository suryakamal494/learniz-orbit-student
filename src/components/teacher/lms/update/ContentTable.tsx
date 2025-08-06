
import React from 'react'
import { Plus, Eye, FileText, Video, Image, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LMSContentItem } from '@/types/lmsContent'

interface ContentTableProps {
  content: LMSContentItem[]
  selectedItemIds: Set<string>
  onAddItem: (item: LMSContentItem) => void
  onPreview: (item: LMSContentItem) => void
}

export const ContentTable: React.FC<ContentTableProps> = ({
  content,
  selectedItemIds,
  onAddItem,
  onPreview
}) => {
  const getTypeIcon = (type: string) => {
    const iconProps = "h-4 w-4"
    switch (type) {
      case 'video-url':
        return <Video className={`${iconProps} text-blue-600`} />
      case 'pdf':
        return <FileText className={`${iconProps} text-red-600`} />
      case 'image':
        return <Image className={`${iconProps} text-green-600`} />
      case 'iframe':
        return <Globe className={`${iconProps} text-purple-600`} />
      default:
        return <FileText className={`${iconProps} text-gray-600`} />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video-url':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pdf':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'image':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'iframe':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const canPreview = (type: string) => {
    return ['video-url', 'pdf', 'image'].includes(type)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Content ({content.length} items)</CardTitle>
      </CardHeader>
      <CardContent>
        {content.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No content matches your current filters</p>
          </div>
        ) : (
          <ScrollArea className="h-[600px] w-full">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {content.map((item) => {
                    const isSelected = selectedItemIds.has(item.id)
                    return (
                      <TableRow key={item.id} className={isSelected ? 'bg-green-50' : ''}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900">{item.title}</div>
                            {item.description && (
                              <div className="text-sm text-gray-500 mt-1">
                                {item.description.length > 100 
                                  ? `${item.description.substring(0, 100)}...`
                                  : item.description
                                }
                              </div>
                            )}
                            <div className="text-xs text-gray-400 mt-1">
                              {item.chapter} • {item.topic}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(item.type)}
                            <Badge className={getTypeBadgeColor(item.type)}>
                              {item.type.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">{item.subject}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {canPreview(item.type) && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onPreview(item)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Preview
                              </Button>
                            )}
                            <Button
                              size="sm"
                              onClick={() => onAddItem(item)}
                              disabled={isSelected}
                              className={isSelected ? 'bg-green-600' : ''}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {isSelected ? 'Added' : 'Add'}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {content.map((item) => {
                const isSelected = selectedItemIds.has(item.id)
                return (
                  <Card key={item.id} className={`p-4 ${isSelected ? 'border-green-200 bg-green-50' : ''}`}>
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {item.subject} • {item.chapter}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(item.type)}
                          <Badge className={getTypeBadgeColor(item.type)}>
                            {item.type.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-400">
                          {item.topic}
                        </div>
                        <div className="flex items-center gap-2">
                          {canPreview(item.type) && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => onPreview(item)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            onClick={() => onAddItem(item)}
                            disabled={isSelected}
                            className={isSelected ? 'bg-green-600' : ''}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            {isSelected ? 'Added' : 'Add'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
