"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { DEFAULT_EMI, DISCLAIMERS } from "@/lib/constants";

interface EmiCalculatorProps {
  phone: string;
}

export function EmiCalculator({ phone }: EmiCalculatorProps) {
  const searchParams = useSearchParams();

  const initialPrice = useMemo(() => {
    const pParam = searchParams.get("price");
    if (pParam) {
      const parsed = Number(pParam);
      if (!isNaN(parsed) && parsed >= DEFAULT_EMI.MIN_PRICE && parsed <= 200000) {
        return parsed;
      }
    }
    return DEFAULT_EMI.PRICE;
  }, [searchParams]);

  const [price, setPrice] = useState(initialPrice);
  const [downPayment, setDownPayment] = useState(() =>
    Math.round(initialPrice * DEFAULT_EMI.DOWN_PAYMENT_RATIO)
  );
  const [interestRate, setInterestRate] = useState<number>(DEFAULT_EMI.INTEREST_RATE);
  const [tenureMonths, setTenureMonths] = useState<number>(DEFAULT_EMI.TENURE_MONTHS);

  const calculation = useMemo(() => {
    const principal = Math.max(0, price - downPayment);
    if (principal === 0) {
      return {
        monthlyEmi: 0,
        principal: 0,
        totalInterest: 0,
        totalPayment: 0,
      };
    }

    const r = interestRate / 12 / 100;
    const n = tenureMonths;

    let emi = 0;
    if (r === 0) {
      emi = principal / n;
    } else {
      const pow = Math.pow(1 + r, n);
      emi = (principal * r * pow) / (pow - 1);
    }

    const totalPayment = emi * n;
    const totalInterest = Math.max(0, totalPayment - principal);

    return {
      monthlyEmi: Math.round(emi),
      principal,
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
    };
  }, [price, downPayment, interestRate, tenureMonths]);

  const whatsappMessage = `Hi, I used your website's EMI calculator for a scooter priced at ₹${price.toLocaleString("en-IN")} with ₹${downPayment.toLocaleString("en-IN")} down payment. Could you share loan options and paperwork required?`;
  const whatsappUrl = buildWhatsAppLink(phone, whatsappMessage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-sm space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="price-range" className="text-sm font-bold text-text-heading">
              Vehicle Price
            </label>
            <span className="text-base font-bold text-brand-primary">
              ₹{price.toLocaleString("en-IN")}
            </span>
          </div>
          <input
            id="price-range"
            type="range"
            min={DEFAULT_EMI.MIN_PRICE}
            max={DEFAULT_EMI.MAX_PRICE}
            step={DEFAULT_EMI.PRICE_STEP}
            value={price}
            onChange={(e) => {
              const val = Number(e.target.value);
              setPrice(val);
              if (downPayment > val * 0.8) {
                setDownPayment(Math.round(val * 0.3));
              }
            }}
            className="w-full accent-brand-primary cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-text-muted mt-1">
            <span>₹{DEFAULT_EMI.MIN_PRICE.toLocaleString("en-IN")}</span>
            <span>₹{DEFAULT_EMI.MAX_PRICE.toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="downpayment-range" className="text-sm font-bold text-text-heading">
              Down Payment
            </label>
            <span className="text-base font-bold text-text-heading">
              ₹{downPayment.toLocaleString("en-IN")}
            </span>
          </div>
          <input
            id="downpayment-range"
            type="range"
            min={DEFAULT_EMI.MIN_DOWN_PAYMENT}
            max={Math.min(100000, price - 10000)}
            step={DEFAULT_EMI.DOWN_PAYMENT_STEP}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-text-muted mt-1">
            <span>₹{DEFAULT_EMI.MIN_DOWN_PAYMENT.toLocaleString("en-IN")}</span>
            <span>₹{Math.min(100000, price - 10000).toLocaleString("en-IN")}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-text-heading mb-2">Loan Tenure</label>
          <div className="grid grid-cols-4 gap-2">
            {DEFAULT_EMI.TENURES.map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => setTenureMonths(months)}
                className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  tenureMonths === months
                    ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                    : "bg-surface-grey border-border-default text-text-body hover:bg-white"
                }`}
              >
                {months} Months
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="rate-range" className="text-sm font-bold text-text-heading">
              Estimated Annual Interest Rate
            </label>
            <span className="text-base font-bold text-text-heading">{interestRate}% p.a.</span>
          </div>
          <input
            id="rate-range"
            type="range"
            min={DEFAULT_EMI.MIN_RATE}
            max={DEFAULT_EMI.MAX_RATE}
            step={DEFAULT_EMI.RATE_STEP}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-text-muted mt-1">
            <span>{DEFAULT_EMI.MIN_RATE}%</span>
            <span>{DEFAULT_EMI.MAX_RATE}%</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-sm flex flex-col justify-between">
        <div>
          <div className="inline-block px-2.5 py-1 rounded bg-brand-tint text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
            Estimated Monthly Payment
          </div>

          <div className="text-4xl sm:text-5xl font-extrabold text-text-heading tracking-tight mb-1">
            ₹{calculation.monthlyEmi.toLocaleString("en-IN")}
            <span className="text-sm sm:text-base font-semibold text-text-muted ml-1">/month</span>
          </div>
          <p className="text-xs text-text-muted mb-6">For {tenureMonths} monthly instalments</p>

          <div className="space-y-3 py-4 border-y border-border-subtle text-sm">
            <div className="flex justify-between text-text-body">
              <span>Loan Principal:</span>
              <span className="font-semibold text-text-heading">
                ₹{calculation.principal.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-text-body">
              <span>Total Interest Payable:</span>
              <span className="font-semibold text-text-heading">
                ₹{calculation.totalInterest.toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between text-text-body pt-2 border-t border-dashed border-border-subtle">
              <span className="font-bold text-text-heading">Total Repayment:</span>
              <span className="font-bold text-text-heading">
                ₹{calculation.totalPayment.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 mt-6 text-xs text-amber-900 leading-relaxed">
            <strong>Disclaimer:</strong> {DISCLAIMERS.FINANCE}
          </div>
        </div>

        <div className="mt-8 pt-4">
          <Button href={whatsappUrl} isExternal variant="whatsapp" size="lg" fullWidth>
            Enquire About Loan Terms on WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
}
