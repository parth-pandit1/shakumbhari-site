"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui";
import { FormField } from "./FormField";
import { FormSuccess } from "./FormSuccess";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const ServiceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  vehicleModel: z.string().min(2, "Please state your scooter model"),
  serviceType: z.enum([
    "General Periodic Service",
    "Brake & Mechanical Repair",
    "Battery & Electrical Check",
    "Spare Parts Replacement",
    "Other Query",
  ]),
  preferredDate: z.string().min(1, "Please choose a preferred visit date"),
  issueDetails: z.string().optional(),
});

type ServiceFormData = z.infer<typeof ServiceSchema>;

interface ServiceBookingFormProps {
  phone: string;
}

export function ServiceBookingForm({ phone }: ServiceBookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      serviceType: "General Periodic Service",
    },
  });

  const onSubmit = (data: ServiceFormData) => {
    const message = [
      "Hi, I'd like to book scooter servicing at Shakumbhari Automobile in Ledi:",
      `• Name: ${data.name}`,
      `• Phone: ${data.phone}`,
      `• Model: ${data.vehicleModel}`,
      `• Service Required: ${data.serviceType}`,
      `• Preferred Date: ${data.preferredDate}`,
      data.issueDetails ? `• Issue Notes: ${data.issueDetails}` : null,
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
          description="Your service booking request has been formatted into WhatsApp. Please send it to confirm workshop availability with our mechanics."
          onReset={() => setIsSubmitted(false)}
          resetButtonText="Submit Another Service Request"
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <FormField id="svc-name" label="Your Name" isRequired error={errors.name?.message}>
            <input
              id="svc-name"
              type="text"
              placeholder="e.g. Vikas Verma"
              {...register("name")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </FormField>

          <FormField id="svc-phone" label="Mobile Number" isRequired error={errors.phone?.message}>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-border-default bg-surface-grey text-xs font-semibold text-text-muted">
                +91
              </span>
              <input
                id="svc-phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                {...register("phone")}
                className="w-full px-3.5 py-2.5 text-sm rounded-r-lg border border-border-default focus:border-brand-primary"
              />
            </div>
          </FormField>

          <FormField
            id="svc-model"
            label="Scooter Make / Model"
            isRequired
            error={errors.vehicleModel?.message}
          >
            <input
              id="svc-model"
              type="text"
              placeholder="e.g. Electric Scooter Model A"
              {...register("vehicleModel")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </FormField>

          <FormField id="svc-type" label="Service Category">
            <select
              id="svc-type"
              {...register("serviceType")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            >
              <option value="General Periodic Service">
                General Periodic Service (Lubrication, Brakes, Bolts)
              </option>
              <option value="Brake & Mechanical Repair">Brake &amp; Mechanical Repair</option>
              <option value="Battery & Electrical Check">Battery &amp; Electrical Check</option>
              <option value="Spare Parts Replacement">
                Spare Parts Replacement (Tyres, Lights, Horn)
              </option>
              <option value="Other Query">Other Issue / Inspection</option>
            </select>
          </FormField>

          <FormField
            id="svc-date"
            label="Preferred Service Date"
            isRequired
            error={errors.preferredDate?.message}
          >
            <input
              id="svc-date"
              type="date"
              {...register("preferredDate")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            />
          </FormField>

          <FormField id="svc-details" label="Issue Symptoms / Notes (Optional)">
            <textarea
              id="svc-details"
              rows={2}
              placeholder="Describe any unusual sounds, brake tightness, or charging questions..."
              {...register("issueDetails")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </FormField>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Note: Submitting formats a WhatsApp message. All servicing is carried out at our
            workshop in Ledi.
          </p>

          <Button type="submit" variant="whatsapp" size="lg" fullWidth disabled={isSubmitting}>
            Book Workshop Service on WhatsApp
          </Button>
        </form>
      )}
    </div>
  );
}
