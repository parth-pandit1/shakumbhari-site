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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeFormData>({
    resolver: zodResolver(ExchangeSchema),
    defaultValues: {
      condition: "Good",
      interestedModel: models[0]?.name.en ?? "",
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
    setIsSubmitted(true);
  };

  return (
    <div className="p-6 sm:p-8 rounded-lg bg-surface-white border border-border-subtle shadow-sm w-full text-left">
      {isSubmitted ? (
        <FormSuccess
          description="Your vehicle details have been formatted. Send the message on WhatsApp to receive a preliminary exchange appraisal and visit guidance."
          onReset={() => setIsSubmitted(false)}
          resetButtonText="Submit Another Valuation"
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField id="ex-name" label="Your Name" isRequired error={errors.name?.message}>
            <input
              id="ex-name"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </FormField>

          <FormField id="ex-phone" label="Mobile Number" isRequired error={errors.phone?.message}>
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
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="ex-vehicle"
              label="Old Scooter Make/Model"
              isRequired
              error={errors.currentVehicle?.message}
            >
              <input
                id="ex-vehicle"
                type="text"
                placeholder="e.g. Activa 4G"
                {...register("currentVehicle")}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
            </FormField>

            <FormField
              id="ex-year"
              label="Manufacturing Year"
              isRequired
              error={errors.year?.message}
            >
              <input
                id="ex-year"
                type="text"
                placeholder="e.g. 2017"
                {...register("year")}
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
            </FormField>
          </div>

          <FormField id="ex-condition" label="Vehicle Running Condition">
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
          </FormField>

          <FormField id="ex-model" label="Interested Electric Scooter" isRequired>
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
          </FormField>

          <Button type="submit" variant="whatsapp" size="lg" fullWidth disabled={isSubmitting}>
            Request valuation on WhatsApp
          </Button>

          <p className="text-[11px] text-text-muted text-center pt-1">
            Submitting opens WhatsApp with your vehicle details prefilled.
          </p>
        </form>
      )}
    </div>
  );
}
