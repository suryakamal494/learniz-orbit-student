
import { ReactNode } from "react"
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
}

export function SidebarHoverMenu({ items, isVisible, position }: SidebarHoverMenuProps) {
  if (!isVisible) return null

  return (
    <div 
      className="fixed z-[200] bg-white border border-border/40 rounded-xl shadow-premium-lg backdrop-blur-sm"
      style={{ 
        left: position.x,
        top: position.y,
        minWidth: '180px'
      }}
    >
      <div className="p-2 space-y-1">
        {items.map((item, index) => (
          <NavLink
            key={item.title}
            to={item.url}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
          >
            {item.emoji && (
              <span className="text-base">{item.emoji}</span>
            )}
            {item.icon && (
              <item.icon className="h-4 w-4 text-gray-500 group-hover:text-primary" />
            )}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}
