
import { ReactNode, useState, useEffect } from "react"
import { LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"

interface MenuItem {
  title: string
  url: string
  icon?: LucideIcon
  emoji?: string
}

interface SidebarHoverMenuProps {
  items: MenuItem[]
  isVisible: boolean
  position: { x: number; y: number }
  onMouseEnter: () => void
  onMouseLeave: () => void
  isClickMode?: boolean
}

export function SidebarHoverMenu({ 
  items, 
  isVisible, 
  position, 
  onMouseEnter, 
  onMouseLeave,
  isClickMode = false
}: SidebarHoverMenuProps) {
  if (!isVisible) return null

  return (
    <>
      {/* Invisible bridge for hover mode */}
      {!isClickMode && (
        <div 
          className="fixed z-[190]"
          style={{ 
            left: position.x - 20,
            top: position.y - 10,
            width: '40px',
            height: `${items.length * 40 + 20}px`
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      )}
      
      <div 
        className="fixed z-[200] bg-gradient-to-br from-card/98 via-background/98 to-muted/98 border-2 border-primary/30 shadow-modern-xl backdrop-blur-xl rounded-xl animate-fade-in"
        style={{ 
          left: position.x,
          top: position.y,
          minWidth: '200px'
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-submenu={true}
      >
        <div className="p-3 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground/80 px-3 py-2 border-b border-border/30 mb-2 bg-gradient-to-r from-primary/5 to-accent-teal/5 rounded-lg">
            Quick Access
          </div>
          {items.map((item, index) => (
            <NavLink
              key={`${item.title}-${index}`}
              to={item.url}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-foreground/90 hover:bg-primary/15 hover:text-primary transition-all duration-200 group border border-transparent hover:border-primary/25 hover:shadow-sm"
            >
              {item.emoji && (
                <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform">{item.emoji}</span>
              )}
              {item.icon && (
                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
              )}
              <span className="truncate">{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  )
}
