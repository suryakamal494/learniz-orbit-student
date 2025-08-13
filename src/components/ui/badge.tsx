
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-gradient-pastel-primary text-white hover:shadow-pastel-md hover:scale-105",
        secondary:
          "border-secondary/30 bg-secondary/80 text-secondary-foreground hover:bg-secondary hover:shadow-pastel-md",
        destructive:
          "border-error/30 bg-gradient-to-r from-error to-error-light text-white hover:shadow-pastel-md hover:scale-105",
        outline: "text-foreground border-primary/30 hover:bg-primary/5 hover:border-primary/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
