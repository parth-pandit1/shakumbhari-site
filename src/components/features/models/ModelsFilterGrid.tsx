"use client";

import { useState, useMemo } from "react";
import { ModelCard } from "./ModelCard";
import { getModelRange } from "@/lib/format";
import type { Model } from "@/content/schemas";

interface ModelsFilterGridProps {
  models: Model[];
  phone: string;
}

export function ModelsFilterGrid({ models, phone }: ModelsFilterGridProps) {
  const [budgetFilter, setBudgetFilter] = useState<string>("all");
  const [rangeFilter, setRangeFilter] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const types = useMemo(() => {
    return Array.from(new Set(models.map((m) => m.type)));
  }, [models]);

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      if (types.length > 1 && selectedType !== "all" && model.type !== selectedType) {
        return false;
      }

      if (budgetFilter === "under-70k") {
        if (!model.priceExShowroom || model.priceExShowroom >= 70000) return false;
      } else if (budgetFilter === "70k-85k") {
        if (
          !model.priceExShowroom ||
          model.priceExShowroom < 70000 ||
          model.priceExShowroom > 85000
        )
          return false;
      } else if (budgetFilter === "above-85k") {
        if (!model.priceExShowroom || model.priceExShowroom <= 85000) return false;
      }

      const maxRange = getModelRange(model).max ?? model.claimedRangeKm;
      if (rangeFilter === "60-plus") {
        if (!maxRange || maxRange < 60) return false;
      } else if (rangeFilter === "80-plus") {
        if (!maxRange || maxRange < 80) return false;
      } else if (rangeFilter === "100-plus") {
        if (!maxRange || maxRange < 100) return false;
      }

      return true;
    });
  }, [models, types.length, selectedType, budgetFilter, rangeFilter]);

  const resetFilters = () => {
    setBudgetFilter("all");
    setRangeFilter("all");
    setSelectedType("all");
  };

  return (
    <div>
      <div className="p-4 sm:p-6 bg-surface-white border border-border-subtle rounded-lg mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {types.length > 1 && (
              <div>
                <label
                  htmlFor="type-filter"
                  className="block text-xs font-semibold text-text-heading mb-1"
                >
                  Vehicle Type
                </label>
                <select
                  id="type-filter"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
                >
                  <option value="all">All Types</option>
                  {types.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label
                htmlFor="budget-filter"
                className="block text-xs font-semibold text-text-heading mb-1"
              >
                Budget (Ex-Showroom)
              </label>
              <select
                id="budget-filter"
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
              >
                <option value="all">Any Budget</option>
                <option value="under-70k">Under ₹70,000</option>
                <option value="70k-85k">₹70,000 to ₹85,000</option>
                <option value="above-85k">Above ₹85,000</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="range-filter"
                className="block text-xs font-semibold text-text-heading mb-1"
              >
                Claimed Range
              </label>
              <select
                id="range-filter"
                value={rangeFilter}
                onChange={(e) => setRangeFilter(e.target.value)}
                className="px-3 py-2 text-xs sm:text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
              >
                <option value="all">Any Range</option>
                <option value="60-plus">60+ km</option>
                <option value="80-plus">80+ km</option>
                <option value="100-plus">100+ km</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-border-subtle">
            <span className="text-xs text-text-muted font-medium">
              Showing <strong>{filteredModels.length}</strong> of {models.length} models
            </span>
            {(budgetFilter !== "all" || rangeFilter !== "all" || selectedType !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-brand-primary hover:underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {filteredModels.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map((model) => (
            <ModelCard key={model.id} model={model} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-surface-grey border border-dashed border-border-default rounded-lg">
          <p className="text-base text-text-heading font-semibold mb-2">
            No models match your current filter selection.
          </p>
          <p className="text-xs text-text-muted mb-4">
            Try adjusting or resetting your budget and range filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-brand-primary text-white hover:bg-brand-hover"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
