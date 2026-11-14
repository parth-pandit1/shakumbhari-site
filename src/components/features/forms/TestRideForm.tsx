"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui";
import { FormField } from "./FormField";
import { FormSuccess } from "./FormSuccess";
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TestRideFormData>({
    resolver: zodResolver(TestRideSchema),
    defaultValues: {
      model: models[0]?.name.en ?? "",
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
    setIsSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-sm max-w-xl mx-auto">
      {isSubmitted ? (
        <FormSuccess
          description="Your test ride details have been formatted into a prefilled WhatsApp message. Send the message on WhatsApp to confirm slot timing with our showroom team."
          onReset={() => setIsSubmitted(false)}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField id="tr-name" label="Your Name" isRequired error={errors.name?.message}>
            <input
              id="tr-name"
              type="text"
              placeholder="e.g. Rahul Sharma"
              {...register("name")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </FormField>

          <FormField
            id="tr-phone"
            label="10-Digit Mobile Number"
            isRequired
            error={errors.phone?.message}
          >
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
          </FormField>

          <FormField
            id="tr-model"
            label="Choose Scooter Model"
            isRequired
            error={errors.model?.message}
          >
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
          </FormField>

          <FormField
            id="tr-date"
            label="Preferred Date"
            isRequired
            error={errors.preferredDate?.message}
          >
            <input
              id="tr-date"
              type="date"
              {...register("preferredDate")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            />
          </FormField>

          <FormField id="tr-notes" label="Any Questions / Notes (Optional)">
            <textarea
              id="tr-notes"
              rows={2}
              placeholder="e.g. Preferred time of visit, looking for long range..."
              {...register("notes")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </FormField>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Note: Submitting this form directly opens WhatsApp on your phone or desktop. We do not
            store personal information on an external server.
          </p>

          <Button type="submit" variant="whatsapp" size="lg" fullWidth disabled={isSubmitting}>
            Confirm &amp; Book via WhatsApp
          </Button>
        </form>
      )}
    </div>
  );
}
