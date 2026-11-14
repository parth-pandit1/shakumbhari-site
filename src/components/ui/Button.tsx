import React from "react";
import Link from "next/link";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "dark" | "whatsapp" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    variant = "primary",
    size = "md",
    href,
    isExternal = false,
    fullWidth = false,
    className = "",
    children,
    disabled,
    ...props
  },
  ref
) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-fast active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none text-center";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs sm:text-sm min-h-[38px]",
    md: "px-5 py-2.5 text-sm sm:text-base min-h-[44px]",
    lg: "px-6 py-3.5 text-base sm:text-lg min-h-[50px]",
  }[size];

  const variantClasses = {
    primary:
      "bg-brand-primary text-white hover:bg-brand-hover shadow-xs",
    dark: "bg-surface-dark text-white hover:bg-[#2e2e2e] shadow-xs",
    // Accessible: Dark text on #25D366 green (Contrast 9.45:1, Rule 2 & WCAG AA)
    whatsapp:
      "bg-whatsapp text-whatsapp-text hover:bg-whatsapp-hover shadow-xs font-bold",
    outline:
      "border border-border-default bg-transparent text-text-heading hover:bg-surface-grey hover:border-border-strong",
    ghost:
      "bg-transparent text-text-body hover:bg-surface-grey hover:text-text-heading",
  }[variant];

  const widthClass = fullWidth ? "w-full" : "";
  const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`;

  if (href) {
    if (isExternal || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClasses}
          target={isExternal || href.startsWith("http") ? "_blank" : undefined}
          rel={isExternal || href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={combinedClasses}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={props.type || "button"}
      className={combinedClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});
