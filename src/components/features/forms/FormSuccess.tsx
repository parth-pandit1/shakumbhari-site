import { Button } from "@/components/ui";

interface FormSuccessProps {
  title?: string;
  description: string;
  onReset: () => void;
  resetButtonText?: string;
}

export function FormSuccess({
  title = "Opening WhatsApp...",
  description,
  onReset,
  resetButtonText = "Submit Another Request",
}: FormSuccessProps) {
  return (
    <div className="text-center py-6">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success-bg text-success-solid">
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-text-heading mb-2">{title}</h3>
      <p className="text-sm text-text-muted mb-6 leading-relaxed max-w-md mx-auto">{description}</p>
      <Button variant="outline" size="sm" onClick={onReset}>
        {resetButtonText}
      </Button>
    </div>
  );
}
