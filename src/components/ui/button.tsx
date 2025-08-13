
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-label-md font-semibold ring-offset-background transition-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 button-ripple relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "gradient-primary text-primary-foreground hover:shadow-premium-lg hover:scale-105 hover:shadow-primary/25",
        destructive: "bg-error text-white hover:bg-error-light hover:shadow-premium-lg hover:shadow-error/25",
        outline: "border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:shadow-premium",
        secondary: "gradient-secondary text-white hover:shadow-premium-lg hover:scale-105 hover:shadow-accent-teal/25",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:scale-105 transition-spring",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-light",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-body-xs",
        lg: "h-14 rounded-2xl px-8 text-label-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
