"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Model } from "@/content/schemas";

const ExchangeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  currentVehicle: z.string().min(2, "Please state your current scooter brand & model"),
  year: z.string().min(4, "Please enter manufacturing year (e.g. 2018)"),
  condition: z.enum(["Excellent", "Good", "Fair", "Needs Repair"]),
  interestedModel: z.string().min(1, "Please choose an EV model you are interested in"),
});

type ExchangeFormData = z.infer<typeof ExchangeSchema>;

interface ExchangeFormProps {
  models: Model[];
  phone: string;
}

export function ExchangeForm({ models, phone }: ExchangeFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeFormData>({
    resolver: zodResolver(ExchangeSchema),
    defaultValues: {
      condition: "Good",
      interestedModel: models[0]?.name.en || "",
    },
  });

  const onSubmit = (data: ExchangeFormData) => {
    const message = [
      "Hi, I'd like an exchange valuation for my old two-wheeler at Shakumbhari Automobile:",
      `• Name: ${data.name}`,
      `• Phone: ${data.phone}`,
      `• Current Scooter: ${data.currentVehicle} (${data.year})`,
      `• Condition: ${data.condition}`,
      `• Interested In: ${data.interestedModel}`,
    ].join("\n");

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
            Your vehicle details have been formatted. Send the message on WhatsApp to receive a preliminary exchange appraisal and visit guidance.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Valuation
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="ex-name" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Your Name <span className="text-brand-primary">*</span>
            </label>
            <input
              id="ex-name"
              type="text"
              placeholder="e.g. Ramesh Kumar"
              {...register("name")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-danger-text">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="ex-phone" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Mobile Number <span className="text-brand-primary">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border-default bg-surface-grey text-xs font-semibold text-text-muted">
                +91
              </span>
              <input
                id="ex-phone"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ex-vehicle" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
                Old Scooter Make/Model <span className="text-brand-primary">*</span>
              </label>
              <input
                id="ex-vehicle"
                type="text"
                placeholder="e.g. Honda Activa 4G"
                {...register("currentVehicle")}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
              {errors.currentVehicle && (
                <p className="mt-1 text-xs text-danger-text">{errors.currentVehicle.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="ex-year" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
                Manufacturing Year <span className="text-brand-primary">*</span>
              </label>
              <input
                id="ex-year"
                type="text"
                placeholder="e.g. 2017"
                {...register("year")}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
              {errors.year && (
                <p className="mt-1 text-xs text-danger-text">{errors.year.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="ex-condition" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Vehicle Running Condition
            </label>
            <select
              id="ex-condition"
              {...register("condition")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            >
              <option value="Excellent">Excellent (Minimal scratches, runs great)</option>
              <option value="Good">Good (Normal daily wear and tear)</option>
              <option value="Fair">Fair (Needs routine cosmetic/engine work)</option>
              <option value="Needs Repair">Needs Major Repair</option>
            </select>
          </div>

          <div>
            <label htmlFor="ex-model" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Interested Electric Scooter <span className="text-brand-primary">*</span>
            </label>
            <select
              id="ex-model"
              {...register("interestedModel")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            >
              {models.map((m) => (
                <option key={m.id} value={m.name.en}>
                  {m.name.en}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Note: Submitting formats a WhatsApp message. Final vehicle evaluation is carried out in-person at our Ledi showroom after physical inspection.
          </p>

          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            fullWidth
            disabled={isSubmitting}
          >
            Request Exchange Valuation on WhatsApp
          </Button>
        </form>
      )}
    </div>
  );
}
