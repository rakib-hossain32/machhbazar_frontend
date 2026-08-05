import { quickCatalogFilters } from "@/components/marketplace/catalog-filter.config";
import type { CatalogFilterKey } from "@/components/marketplace/catalog-filter.types";
import {
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

type CatalogQuickRoutesProps = {
  idPrefix: string;
  onFilterChange: (key: CatalogFilterKey, value?: string) => void;
  selectedValues: Partial<Record<CatalogFilterKey, string>>;
};

export function CatalogQuickRoutes({
  idPrefix,
  onFilterChange,
  selectedValues,
}: CatalogQuickRoutesProps) {
  const selectedRoutes = quickCatalogFilters
    .filter(({ key, value }) => selectedValues[key] === value)
    .map(({ id }) => id);

  function handleRouteChange(nextValues: string[]) {
    const changedRoute = quickCatalogFilters.find(
      ({ id }) =>
        nextValues.includes(id) !== selectedRoutes.includes(id),
    );

    if (changedRoute) {
      onFilterChange(changedRoute.key, changedRoute.value);
    }
  }

  return (
    <FieldSet className="gap-3 px-4 py-4">
      <FieldLegend
        id={`${idPrefix}-quick-routes`}
        variant="label"
        className="font-mono text-[9px] text-muted-foreground uppercase"
      >
        Quick discovery routes
      </FieldLegend>
      <ToggleGroup
        multiple
        value={selectedRoutes}
        onValueChange={handleRouteChange}
        variant="outline"
        spacing={2}
        aria-labelledby={`${idPrefix}-quick-routes`}
        className="grid w-full grid-cols-3"
      >
        {quickCatalogFilters.map(({ caption, icon: Icon, id, label }) => (
          <ToggleGroupItem
            key={id}
            value={id}
            aria-label={`${label}: ${caption}`}
            className="h-auto min-w-0 flex-col items-start gap-1 rounded-xl px-2.5 py-2.5 text-left"
          >
            <Icon aria-hidden="true" />
            <span className="w-full truncate text-[10px] font-bold">
              {label}
            </span>
            <span className="hidden w-full truncate text-[8px] font-normal text-muted-foreground xl:block">
              {caption}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FieldSet>
  );
}

