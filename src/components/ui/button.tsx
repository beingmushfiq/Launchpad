import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none active:scale-[0.97]";

    const variants = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md",
      secondary: "bg-surface-100 text-surface-800 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-100 dark:hover:bg-surface-700",
      outline: "border-2 border-surface-200 text-surface-700 hover:bg-surface-50 hover:border-surface-300 dark:border-surface-700 dark:text-surface-300 dark:hover:bg-surface-800",
      ghost: "text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100",
      destructive: "bg-error text-white hover:bg-red-600 shadow-sm",
      accent: "bg-accent-500 text-white hover:bg-accent-600 shadow-sm hover:shadow-md",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-5 text-sm",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
