"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Model } from "@/content/schemas";

const TestRideSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  model: z.string().min(1, "Please select a scooter model"),
  preferredDate: z.string().min(1, "Please choose a preferred visit date"),
  notes: z.string().optional(),
});

type TestRideFormData = z.infer<typeof TestRideSchema>;

interface TestRideFormProps {
  models: Model[];
  phone: string;
}

export function TestRideForm({ models, phone }: TestRideFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestRideFormData>({
    resolver: zodResolver(TestRideSchema),
    defaultValues: {
      model: models[0]?.name.en || "",
    },
  });

  const onSubmit = (data: TestRideFormData) => {
    const message = [
      "Hi, I'd like to book a test ride at Shakumbhari Automobile showroom in Ledi:",
      `• Name: ${data.name}`,
      `• Phone: ${data.phone}`,
      `• Model: ${data.model}`,
      `• Preferred Date: ${data.preferredDate}`,
      data.notes ? `• Notes: ${data.notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const link = buildWhatsAppLink(phone, message);
    window.open(link, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-sm max-w-xl mx-auto">
      {submitted ? (
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
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-text-heading mb-2">
            Opening WhatsApp...
          </h3>
          <p className="text-sm text-text-muted mb-6 leading-relaxed">
            Your test ride details have been formatted into a prefilled WhatsApp message. Send the message on WhatsApp to confirm slot timing with our showroom team.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="tr-name" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Your Name <span className="text-brand-primary">*</span>
            </label>
            <input
              id="tr-name"
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register("name")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-danger-text">{errors.name.message}</p>
            )}
          </div>

          {/* 10-digit Phone */}
          <div>
            <label htmlFor="tr-phone" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              10-Digit Mobile Number <span className="text-brand-primary">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border-default bg-surface-grey text-xs font-semibold text-text-muted">
                +91
              </span>
              <input
                id="tr-phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                {...register("phone")}
                className="w-full px-3.5 py-2.5 text-sm rounded-r-lg border border-border-default focus:border-brand-primary"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-danger-text">{errors.phone.message}</p>
            )}
          </div>

          {/* Model selection */}
          <div>
            <label htmlFor="tr-model" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Choose Scooter Model <span className="text-brand-primary">*</span>
            </label>
            <select
              id="tr-model"
              {...register("model")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            >
              {models.map((m) => (
                <option key={m.id} value={m.name.en}>
                  {m.name.en}
                </option>
              ))}
            </select>
            {errors.model && (
              <p className="mt-1 text-xs text-danger-text">{errors.model.message}</p>
            )}
          </div>

          {/* Preferred Date */}
          <div>
            <label htmlFor="tr-date" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Preferred Date <span className="text-brand-primary">*</span>
            </label>
            <input
              id="tr-date"
              type="date"
              {...register("preferredDate")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            />
            {errors.preferredDate && (
              <p className="mt-1 text-xs text-danger-text">{errors.preferredDate.message}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="tr-notes" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Any Questions / Notes (Optional)
            </label>
            <textarea
              id="tr-notes"
              rows={2}
              placeholder="e.g. Preferred time of visit, looking for long range..."
              {...register("notes")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </div>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Note: Submitting this form directly opens WhatsApp on your phone or desktop. We do not store personal information on an external server.
          </p>

          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            fullWidth
            disabled={isSubmitting}
          >
            Confirm &amp; Book via WhatsApp
          </Button>
        </form>
      )}
    </div>
  );
}
