// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  asChild?: boolean;
  glow?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  glow = false,
  ...props
}: ButtonProps) {
  const baseStyles = "btn-premium font-medium relative overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary shadow-soft hover:shadow-medium",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-secondary shadow-soft hover:shadow-medium",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent shadow-soft hover:shadow-medium",
    outline: "border-2 border-primary/30 text-primary hover:border-primary hover:bg-primary/5 focus:ring-primary/50",
    ghost: "text-primary hover:bg-primary/5 focus:ring-primary/50",
    gradient: "bg-gradient-primary text-white hover:opacity-95 focus:ring-primary shadow-glow hover:shadow-large",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm rounded-lg",
    md: "h-12 px-6 py-2.5 text-base rounded-xl",
    lg: "h-14 px-8 py-3 text-lg rounded-xl",
    xl: "h-16 px-10 py-4 text-xl rounded-2xl",
  };

  // Shine effect for gradient buttons
  const shineEffect = variant === "gradient" && (
    <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );

  // Glow pulse animation
  const glowEffect = glow && (
    <span className="absolute inset-0 rounded-xl animate-pulse-slow bg-primary/20 blur-xl" />
  );

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {glowEffect}
      {shineEffect}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {props.children}
      </span>
    </button>
  );
}