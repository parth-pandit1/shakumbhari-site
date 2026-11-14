"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { DEFAULT_RUNNING_COST, DISCLAIMERS } from "@/lib/constants";

export interface RunningCostEstimatorProps {
  phone: string;
}

export function RunningCostEstimator({ phone }: RunningCostEstimatorProps) {
  const [dailyKm, setDailyKm] = useState<number>(DEFAULT_RUNNING_COST.DAILY_KM);
  const [petrolPrice, setPetrolPrice] = useState<number>(DEFAULT_RUNNING_COST.PETROL_PRICE);
  const [petrolMileage, setPetrolMileage] = useState<number>(DEFAULT_RUNNING_COST.PETROL_MILEAGE);
  const [electricityRate, setElectricityRate] = useState<number>(
    DEFAULT_RUNNING_COST.ELECTRICITY_RATE
  );
  const [evUnitsPer100km, setEvUnitsPer100km] = useState<number>(
    DEFAULT_RUNNING_COST.EV_UNITS_PER_100KM
  );

  const stats = useMemo(() => {
    // Petrol calculation
    const petrolLitersPerDay = dailyKm / petrolMileage;
    const dailyPetrolCost = petrolLitersPerDay * petrolPrice;
    const monthlyPetrolCost = dailyPetrolCost * 30;
    const annualPetrolCost = dailyPetrolCost * 365;

    // EV calculation
    const evKwhPerDay = (dailyKm * evUnitsPer100km) / 100;
    const dailyEvCost = evKwhPerDay * electricityRate;
    const monthlyEvCost = dailyEvCost * 30;
    const annualEvCost = dailyEvCost * 365;

    // Savings
    const monthlySavings = Math.max(0, monthlyPetrolCost - monthlyEvCost);
    const annualSavings = Math.max(0, annualPetrolCost - annualEvCost);
    const threeYearSavings = annualSavings * 3;

    return {
      dailyPetrolCost: Math.round(dailyPetrolCost),
      dailyEvCost: Math.round(dailyEvCost),
      monthlyPetrolCost: Math.round(monthlyPetrolCost),
      monthlyEvCost: Math.round(monthlyEvCost),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      threeYearSavings: Math.round(threeYearSavings),
    };
  }, [dailyKm, petrolPrice, petrolMileage, electricityRate, evUnitsPer100km]);

  const whatsappMessage = `Hi, I checked the EV running cost estimator on your website for a daily commute of ${dailyKm} km. Could you suggest the most suitable scooter model for my usage?`;
  const whatsappUrl = buildWhatsAppLink(phone, whatsappMessage);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Assumptions Inputs */}
      <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-sm space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="daily-km" className="text-sm font-bold text-text-heading">
              Daily Riding Distance
            </label>
            <span className="text-base font-bold text-brand-primary">{dailyKm} km/day</span>
          </div>
          <input
            id="daily-km"
            type="range"
            min={10}
            max={100}
            step={5}
            value={dailyKm}
            onChange={(e) => setDailyKm(Number(e.target.value))}
            className="w-full accent-brand-primary cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-text-muted mt-1">
            <span>10 km</span>
            <span>100 km</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle">
          <h3 className="text-xs font-bold text-text-heading uppercase tracking-wider mb-4">
            Petrol Scooter Assumptions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="petrol-price"
                className="block text-xs font-semibold text-text-muted mb-1"
              >
                Petrol Price (₹/Litre): <strong>₹{petrolPrice}</strong>
              </label>
              <input
                id="petrol-price"
                type="number"
                min={80}
                max={120}
                value={petrolPrice}
                onChange={(e) => setPetrolPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
            </div>

            <div>
              <label
                htmlFor="petrol-mileage"
                className="block text-xs font-semibold text-text-muted mb-1"
              >
                Petrol Mileage (km/L): <strong>{petrolMileage} km/L</strong>
              </label>
              <input
                id="petrol-mileage"
                type="number"
                min={25}
                max={65}
                value={petrolMileage}
                onChange={(e) => setPetrolMileage(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-subtle">
          <h3 className="text-xs font-bold text-text-heading uppercase tracking-wider mb-4">
            Electric Scooter Assumptions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="elec-rate"
                className="block text-xs font-semibold text-text-muted mb-1"
              >
                Electricity Rate (₹/kWh unit): <strong>₹{electricityRate}</strong>
              </label>
              <input
                id="elec-rate"
                type="number"
                step={0.5}
                min={4}
                max={15}
                value={electricityRate}
                onChange={(e) => setElectricityRate(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
            </div>

            <div>
              <label
                htmlFor="ev-consumption"
                className="block text-xs font-semibold text-text-muted mb-1"
              >
                Energy per 100 km: <strong>{evUnitsPer100km} units</strong>
              </label>
              <input
                id="ev-consumption"
                type="number"
                step={0.5}
                min={1.5}
                max={6}
                value={evUnitsPer100km}
                onChange={(e) => setEvUnitsPer100km(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border-default focus:border-brand-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Results Card */}
      <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-surface-white border border-border-subtle shadow-sm flex flex-col justify-between">
        <div>
          <div className="inline-block px-2.5 py-1 rounded bg-success-bg text-success-text text-xs font-bold uppercase tracking-wider mb-4">
            Estimated Fuel Savings
          </div>

          <div className="text-4xl sm:text-5xl font-extrabold text-success-solid tracking-tight mb-1">
            ₹{stats.annualSavings.toLocaleString("en-IN")}
            <span className="text-sm sm:text-base font-semibold text-text-muted ml-1">/year</span>
          </div>
          <p className="text-xs text-text-muted mb-6">
            Approx. ₹{stats.monthlySavings.toLocaleString("en-IN")} saved every month
          </p>

          {/* Side by Side Cost Breakdown */}
          <div className="space-y-4 py-4 border-y border-border-subtle">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Monthly Petrol Cost:</span>
              <span className="font-bold text-danger-text">
                ₹{stats.monthlyPetrolCost.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-text-muted">Monthly EV Charging:</span>
              <span className="font-bold text-success-text">
                ₹{stats.monthlyEvCost.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm pt-2 border-t border-dashed border-border-subtle">
              <span className="font-bold text-text-heading">Estimated 3-Year Savings:</span>
              <span className="font-extrabold text-lg text-success-solid">
                ₹{stats.threeYearSavings.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Estimate Label / Disclaimer */}
          <div className="p-3.5 rounded-xl bg-surface-grey border border-border-subtle mt-6 text-xs text-text-muted leading-relaxed">
            <strong>Estimation Notice:</strong> {DISCLAIMERS.RUNNING_COST}
          </div>
        </div>

        <div className="mt-8 pt-4">
          <Button href={whatsappUrl} isExternal variant="whatsapp" size="lg" fullWidth>
            Find a Scooter for Your Daily Commute
          </Button>
        </div>
      </div>
    </div>
  );
}
