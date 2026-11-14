"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
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
  const [submitted, setSubmitted] = useState(false);

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
            Your service booking request has been formatted into WhatsApp. Please send it to confirm workshop availability with our mechanics.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSubmitted(false)}
          >
            Submit Another Service Request
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <label htmlFor="svc-name" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Your Name <span className="text-brand-primary">*</span>
            </label>
            <input
              id="svc-name"
              type="text"
              placeholder="e.g. Vikas Verma"
              {...register("name")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-danger-text">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="svc-phone" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Mobile Number <span className="text-brand-primary">*</span>
            </label>
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
            {errors.phone && (
              <p className="mt-1 text-xs text-danger-text">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="svc-model" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Scooter Make / Model <span className="text-brand-primary">*</span>
            </label>
            <input
              id="svc-model"
              type="text"
              placeholder="e.g. Electric Scooter Model A"
              {...register("vehicleModel")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
            {errors.vehicleModel && (
              <p className="mt-1 text-xs text-danger-text">{errors.vehicleModel.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="svc-type" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Service Category
            </label>
            <select
              id="svc-type"
              {...register("serviceType")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            >
              <option value="General Periodic Service">General Periodic Service (Lubrication, Brakes, Bolts)</option>
              <option value="Brake & Mechanical Repair">Brake &amp; Mechanical Repair</option>
              <option value="Battery & Electrical Check">Battery &amp; Electrical Check</option>
              <option value="Spare Parts Replacement">Spare Parts Replacement (Tyres, Lights, Horn)</option>
              <option value="Other Query">Other Issue / Inspection</option>
            </select>
          </div>

          <div>
            <label htmlFor="svc-date" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Preferred Service Date <span className="text-brand-primary">*</span>
            </label>
            <input
              id="svc-date"
              type="date"
              {...register("preferredDate")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
            />
            {errors.preferredDate && (
              <p className="mt-1 text-xs text-danger-text">{errors.preferredDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="svc-details" className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-1">
              Issue Symptoms / Notes (Optional)
            </label>
            <textarea
              id="svc-details"
              rows={2}
              placeholder="Describe any unusual sounds, brake tightness, or charging questions..."
              {...register("issueDetails")}
              className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-border-default focus:border-brand-primary"
            />
          </div>

          <p className="text-[11px] text-text-muted leading-relaxed">
            Note: Submitting formats a WhatsApp message. All servicing is carried out at our workshop in Ledi.
          </p>

          <Button
            type="submit"
            variant="whatsapp"
            size="lg"
            fullWidth
            disabled={isSubmitting}
          >
            Book Workshop Service on WhatsApp
          </Button>
        </form>
      )}
    </div>
  );
}
