import type { ReactNode } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  isRequired?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  isRequired = false,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold text-text-heading mb-1">
        {label} {isRequired && <span className="text-brand-primary">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-danger-text">{error}</p>}
    </div>
  );
}
