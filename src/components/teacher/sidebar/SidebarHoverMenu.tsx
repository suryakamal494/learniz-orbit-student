
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
}

export function SidebarHoverMenu({ 
  items, 
  isVisible, 
  position, 
  onMouseEnter, 
  onMouseLeave 
}: SidebarHoverMenuProps) {
  if (!isVisible) return null

  return (
    <>
      {/* Invisible bridge to prevent gap issues */}
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
      
      <div 
        className="fixed z-[200] bg-gradient-to-br from-background/95 to-muted/95 border border-border shadow-premium-lg backdrop-blur-md rounded-xl animate-fade-in"
        style={{ 
          left: position.x,
          top: position.y,
          minWidth: '200px'
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="p-2 space-y-1">
          {items.map((item, index) => (
            <NavLink
              key={`${item.title}-${index}`}
              to={item.url}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-foreground/80 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            >
              {item.emoji && (
                <span className="text-base flex-shrink-0">{item.emoji}</span>
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
