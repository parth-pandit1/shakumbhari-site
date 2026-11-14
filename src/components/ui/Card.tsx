import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "white" | "grey" | "dark" | "outline";
  hoverEffect?: boolean;
  className?: string;
}

export function Card({
  children,
  variant = "white",
  hoverEffect = false,
  className = "",
  ...props
}: CardProps) {
  const variantClasses = {
    white: "bg-surface-white border border-border-subtle shadow-sm",
    grey: "bg-surface-grey border border-border-subtle shadow-xs",
    dark: "bg-surface-dark-card text-white border border-white/10 shadow-md",
    outline: "bg-transparent border border-border-default",
  }[variant];

  const hoverClasses = hoverEffect
    ? "transition-all duration-normal hover:shadow-md hover:border-brand-primary/40 hover:-translate-y-0.5"
    : "";

  return (
    <div
      className={`rounded-xl overflow-hidden ${variantClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 sm:p-6 pb-2 sm:pb-3 ${className}`}>{children}</div>;
}

export function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-5 sm:p-6 ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-5 sm:p-6 pt-3 sm:pt-4 border-t border-border-subtle ${className}`}
    >
      {children}
    </div>
  );
}
