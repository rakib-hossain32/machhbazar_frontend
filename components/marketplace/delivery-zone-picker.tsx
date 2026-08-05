"use client";

import {
  deliveryZoneDetails,
  deliveryZones,
} from "@/components/marketplace/catalog-filter.config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  ChevronsUpDown,
  CircleDotDashed,
  LocateFixed,
  MapPin,
  Navigation,
  Route,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

type DeliveryZonePickerProps = {
  idPrefix: string;
  onClear: () => void;
  onSelect: (zone: string) => void;
  selectedZone?: string;
};

type DeliveryDockResultsProps = {
  onChoose: (zone: string) => void;
  query: string;
  selectedZone?: string;
  setQuery: (query: string) => void;
};

function DeliveryTicketContent({ selectedZone }: { selectedZone?: string }) {
  return (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <Route aria-hidden="true" />
      </span>
      <Separator orientation="vertical" className="h-8 shrink-0" />
      <span className="min-w-0 flex-1 py-0.5">
        <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold text-muted-foreground uppercase">
          <CircleDotDashed className="size-3" aria-hidden="true" />
          Delivery route desk
        </span>
        <span className="mt-0.5 block truncate text-xs font-bold text-foreground">
          {selectedZone ?? "Choose a delivery area"}
        </span>
      </span>
      <ChevronsUpDown className="shrink-0 text-muted-foreground" aria-hidden="true" />
    </>
  );
}

function DeliveryDockResults({
  onChoose,
  query,
  selectedZone,
  setQuery,
}: DeliveryDockResultsProps) {
  const normalizedQuery = query.trim().replace(/\s+/g, " ").slice(0, 80);
  const isKnownZone = deliveryZones.some(
    (zone) => zone.toLowerCase() === normalizedQuery.toLowerCase(),
  );
  const isCustomSelection =
    Boolean(selectedZone) &&
    !deliveryZones.some(
      (zone) => zone.toLowerCase() === selectedZone?.toLowerCase(),
    );
  const canUseCustomZone =
    normalizedQuery.length >= 2 &&
    !isKnownZone &&
    normalizedQuery.toLowerCase() !== selectedZone?.toLowerCase();

  return (
    <Command className="min-h-0 rounded-none! p-0">
      <div className="px-3 pt-3 sm:px-4">
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Try ‘Dhanmondi 27’ or ‘1216’"
          maxLength={80}
          aria-label="Search delivery location"
        />
      </div>

      <CommandList className="max-h-[min(21rem,45dvh)] px-2 py-2 sm:px-3">
        {canUseCustomZone ? (
          <>
            <CommandGroup heading="Your searched waypoint">
              <CommandItem
                value={normalizedQuery}
                onSelect={() => onChoose(normalizedQuery)}
                className="min-h-16 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 data-selected:bg-primary/10"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Navigation aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[8px] font-bold text-muted-foreground uppercase">
                    Pin as custom dock
                  </span>
                  <span className="block truncate font-semibold">
                    {normalizedQuery}
                  </span>
                </span>
                <Badge variant="secondary">Use this</Badge>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}

        {isCustomSelection && !normalizedQuery ? (
          <>
            <CommandGroup heading="Currently pinned">
              <CommandItem
                value={selectedZone}
                data-checked="true"
                onSelect={() => onChoose(selectedZone!)}
                className="min-h-14 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2"
              >
                <LocateFixed aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate font-semibold">
                  {selectedZone}
                </span>
                <Badge variant="outline">Custom</Badge>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}

        <CommandEmpty className="px-5 py-8">
          <span className="mx-auto mb-2 grid size-9 place-items-center rounded-full bg-muted text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
          </span>
          <span className="block font-semibold text-foreground">
            {normalizedQuery.length === 1
              ? "Type one more character"
              : "No matching route yet"}
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Enter at least 2 characters to pin a custom location.
          </span>
        </CommandEmpty>

        <CommandGroup heading="Fast delivery corridors">
          {deliveryZones.map((zone) => {
            const detail = deliveryZoneDetails[zone];
            const checked = selectedZone === zone;

            return (
              <CommandItem
                key={zone}
                value={`${zone} ${detail.note}`}
                data-checked={checked}
                onSelect={() => onChoose(zone)}
                className="min-h-14 rounded-xl border border-transparent px-3 py-2 data-[checked=true]:border-primary/20 data-[checked=true]:bg-primary/5 data-selected:bg-muted"
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border font-mono text-[8px] font-bold",
                    checked
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {detail.code}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{zone}</span>
                  <span className="block truncate text-[10px] text-muted-foreground">
                    {detail.note}
                  </span>
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function DeliveryZonePicker({
  idPrefix,
  onClear,
  onSelect,
  selectedZone,
}: DeliveryZonePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  function resetSearch() {
    setQuery("");
  }

  function chooseZone(zone: string) {
    if (zone !== selectedZone) onSelect(zone);
    setOpen(false);
    resetSearch();
  }

  function clearZone() {
    onClear();
    setOpen(false);
    resetSearch();
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) resetSearch();
      }}
    >
      <DialogTrigger
        render={
          <Button
            id={`${idPrefix}-zone-trigger`}
            type="button"
            variant="outline"
            className="h-auto min-h-15 w-full min-w-0 justify-start gap-2 overflow-hidden rounded-xl px-2.5 py-2 text-left shadow-xs"
          />
        }
      >
        <DeliveryTicketContent selectedZone={selectedZone} />
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-[calc(100%-1rem)] gap-0 overflow-hidden rounded-[1.75rem] p-0 sm:max-w-xl"
      >
        <DialogHeader className="relative overflow-hidden bg-market-rail px-4 py-4 text-left text-market-rail-ink sm:px-5 sm:py-5">
          <span
            aria-hidden="true"
            className="absolute -top-16 -right-10 size-40 rounded-full border border-market-rail-ink/15"
          />
          <span
            aria-hidden="true"
            className="absolute -top-5 right-7 size-24 rounded-full border border-market-rail-ink/15"
          />
          <div className="relative flex min-w-0 items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-market-aqua text-market-rail sm:size-11">
              <LocateFixed aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <Badge variant="secondary">Live route desk · 01</Badge>
              <DialogTitle className="mt-2 text-lg text-market-rail-ink sm:text-xl">
                Map your delivery landing point
              </DialogTitle>
              <DialogDescription className="mt-1 max-w-md text-xs text-market-rail-ink/65 sm:text-sm">
                Pick a fast corridor or pin any district, landmark, or postcode.
              </DialogDescription>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="icon-sm"
              aria-label="Close delivery route desk"
              className="shrink-0"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
        </DialogHeader>

        <DeliveryDockResults
          query={query}
          setQuery={setQuery}
          selectedZone={selectedZone}
          onChoose={chooseZone}
        />

        <Separator />
        <DialogFooter className="mx-0 mb-0 flex-row items-center justify-between gap-3 rounded-none border-0 bg-transparent px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="font-mono text-[8px] font-bold text-muted-foreground uppercase">
              Route status
            </p>
            <p className="truncate text-[10px] font-semibold sm:text-xs">
              {selectedZone ? `Pinned to ${selectedZone}` : "No waypoint pinned yet"}
            </p>
          </div>
          {selectedZone ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearZone}
              className="shrink-0"
            >
              <Trash2 data-icon="inline-start" />
              Clear
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Continue browsing
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
