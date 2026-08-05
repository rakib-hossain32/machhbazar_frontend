"use client";

import { catalogFilterMeta } from "@/components/marketplace/catalog-filter.config";
import type { CatalogFilterPanelProps } from "@/components/marketplace/catalog-filter.types";
import { CatalogQuickRoutes } from "@/components/marketplace/catalog-quick-routes";
import { DeliveryZonePicker } from "@/components/marketplace/delivery-zone-picker";
import { catalogFilters } from "@/components/marketplace/market-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Compass,
  Crosshair,
  RotateCcw,
} from "lucide-react";

export type { CatalogFilterKey } from "@/components/marketplace/catalog-filter.types";

export function CatalogFilterPanel({
  activeCount,
  className,
  footerAction,
  headerAction,
  idPrefix,
  mode = "desktop",
  onFilterChange,
  onReset,
  selectedValues,
}: CatalogFilterPanelProps) {
  return (
    <Card
      className={cn(
        "gap-0 py-0",
        mode === "desktop"
          ? "h-[calc(100svh-7.5rem)] min-h-130"
          : "h-full rounded-none ring-0",
        className,
      )}
    >
      <CardHeader className="relative overflow-hidden rounded-none bg-market-rail px-5 py-5 text-market-rail-ink">
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-12 size-40 rounded-full border border-market-rail-ink/15"
        />
        <div
          aria-hidden="true"
          className="absolute -top-8 -right-4 size-24 rounded-full border border-market-rail-ink/15"
        />
        <div className="mb-2 flex items-center gap-2 font-mono text-[9px] font-bold text-market-aqua uppercase">
          <Crosshair className="size-3.5" aria-hidden="true" />
          Catch compass · live market
        </div>
        <CardTitle
          className={cn(
            "text-xl text-market-rail-ink",
            mode === "sheet" ? "max-w-40 sm:max-w-48" : "max-w-48",
          )}
        >
          Chart your perfect catch
        </CardTitle>
        <CardDescription className="max-w-56 text-xs text-market-rail-ink/65">
          Follow the route from delivery zone to freshness proof.
        </CardDescription>
        <CardAction className="flex items-center gap-1.5">
          <Badge variant="secondary">
            <Compass data-icon="inline-start" />
            {activeCount || "Open"}
          </Badge>
          {headerAction}
        </CardAction>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col px-0">
        <CatalogQuickRoutes
          idPrefix={idPrefix}
          selectedValues={selectedValues}
          onFilterChange={onFilterChange}
        />

        <Separator />

        <ScrollArea className="min-h-0 flex-1">
          <div className="relative px-3 py-2">
            <div
              aria-hidden="true"
              className="absolute top-8 bottom-8 left-[2.05rem] border-l border-dashed border-primary/25"
            />

            {catalogFilters.map((filter, index) => {
              const meta = catalogFilterMeta[filter.key];
              const Icon = meta.icon;
              const selectedValue = selectedValues[filter.key];

              return (
                <div key={filter.key}>
                  {index > 0 ? <Separator className="ml-10" /> : null}
                  <Collapsible
                    key={`${filter.key}-${selectedValue ? "selected" : "empty"}`}
                    defaultOpen={index < 3 || Boolean(selectedValue)}
                    className="group/section relative"
                  >
                    <CollapsibleTrigger
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-auto w-full justify-start rounded-xl px-2 py-3 text-left"
                        />
                      }
                    >
                      <span className="relative grid size-7 shrink-0 place-items-center rounded-full border border-primary/25 bg-card font-mono text-[8px] font-bold text-primary">
                        {meta.step}
                      </span>
                      <Icon aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-bold text-foreground">
                          {filter.title}
                        </span>
                        <span className="block truncate text-[9px] font-normal text-muted-foreground">
                          {selectedValue ?? meta.hint}
                        </span>
                      </span>
                      {selectedValue ? (
                        <Badge variant="secondary">Set</Badge>
                      ) : null}
                      <ChevronDown
                        data-icon="inline-end"
                        className="transition-transform group-data-panel-open/button:rotate-180"
                        aria-hidden="true"
                      />
                    </CollapsibleTrigger>

                    <CollapsibleContent className="pb-3 pl-10 data-ending-style:opacity-0 data-starting-style:opacity-0 transition-opacity">
                      <FieldSet className="gap-2">
                        <FieldLegend className="sr-only">
                          {filter.title}
                        </FieldLegend>
                        {filter.key === "zone" ? (
                          <DeliveryZonePicker
                            idPrefix={idPrefix}
                            selectedZone={selectedValue}
                            onClear={() => onFilterChange("zone")}
                            onSelect={(zone) =>
                              onFilterChange("zone", zone)
                            }
                          />
                        ) : (
                          <FieldGroup className="gap-1.5">
                            {filter.values.map((value, valueIndex) => {
                              const checked = selectedValue === value;
                              const checkboxId = `${idPrefix}-${filter.key}-${valueIndex}`;

                              return (
                                <Field
                                  key={value}
                                  orientation="horizontal"
                                  className={cn(
                                    "rounded-lg border px-2.5 py-2 transition-colors",
                                    checked
                                      ? "border-primary/30 bg-primary/5"
                                      : "border-transparent hover:border-border hover:bg-muted/55",
                                  )}
                                >
                                  <Checkbox
                                    id={checkboxId}
                                    checked={checked}
                                    onCheckedChange={() =>
                                      onFilterChange(filter.key, value)
                                    }
                                    aria-label={`${filter.title}: ${value}`}
                                  />
                                  <FieldLabel
                                    htmlFor={checkboxId}
                                    className="min-w-0 flex-1 cursor-pointer text-xs font-normal"
                                  >
                                    <span className="truncate">{value}</span>
                                  </FieldLabel>
                                </Field>
                              );
                            })}
                          </FieldGroup>
                        )}
                      </FieldSet>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[8px] font-bold text-muted-foreground uppercase">
            Net status
          </p>
          <p className="truncate text-xs font-semibold">
            {activeCount
              ? `${activeCount} route${activeCount === 1 ? "" : "s"} marked`
              : "Ready to explore"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {activeCount ? (
            <Button type="button" variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw data-icon="inline-start" />
              Reset
            </Button>
          ) : null}
          {footerAction}
        </div>
      </CardFooter>
    </Card>
  );
}
