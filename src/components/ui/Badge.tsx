import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "neutral" | "success" | "warning" | "danger" | "dark";
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Badge({
  variant = "brand",
  size = "md",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-semibold tracking-wide",
    md: "px-2.5 py-1 text-xs font-semibold tracking-wide",
  }[size];

  const variantClasses = {
    brand: "bg-brand-tint text-brand-primary border border-brand-border",
    neutral: "bg-surface-grey text-text-muted border border-border-subtle",
    success: "bg-success-bg text-success-text border border-success-text/20",
    warning: "bg-warning-bg text-warning-text border border-warning-text/20",
    danger: "bg-danger-bg text-danger-text border border-danger-text/20",
    dark: "bg-surface-dark-card text-white border border-white/10",
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-full uppercase ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
