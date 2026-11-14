import type { HTMLAttributes, ReactNode } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  variant?: "white" | "grey" | "dark" | "tint";
  id?: string;
}

export function Section({
  children,
  className = "",
  variant = "white",
  id,
  ...props
}: SectionProps) {
  const variantClasses = {
    white: "bg-surface-white text-text-body",
    grey: "bg-surface-grey text-text-body",
    dark: "bg-surface-dark text-white",
    tint: "bg-brand-tint text-text-body",
  }[variant];

  return (
    <section
      id={id}
      className={`py-12 sm:py-16 md:py-20 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
