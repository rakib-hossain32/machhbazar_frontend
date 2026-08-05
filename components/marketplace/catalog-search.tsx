import { Badge } from "@/components/ui/badge";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search, X } from "lucide-react";
import Link from "next/link";

type CatalogSearchProps = {
  defaultQuery?: string;
  preservedParams: Array<[string, string]>;
  resultCount: number;
};

function createClearSearchHref(preservedParams: Array<[string, string]>) {
  const queryString = new URLSearchParams(preservedParams).toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}

export function CatalogSearch({
  defaultQuery,
  preservedParams,
  resultCount,
}: CatalogSearchProps) {
  const hasQuery = Boolean(defaultQuery?.trim());

  return (
    <form
      action="/shop"
      className="min-w-0 rounded-2xl border border-primary/20 bg-card px-3 py-3 shadow-[0_12px_32px_rgba(19,42,45,0.06)] sm:px-4"
    >
      {preservedParams.map(([key, value], index) => (
        <input
          key={`${key}-${value}-${index}`}
          type="hidden"
          name={key}
          value={value}
        />
      ))}

      <FieldGroup className="h-full gap-3">
        <Field className="h-full min-w-0 justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/25 bg-primary-soft font-mono text-[9px] font-bold text-primary">
              01
            </span>
            <div className="min-w-0 flex-1">
              <FieldLabel
                htmlFor="catalog-search"
                className="font-heading text-sm font-semibold"
              >
                Search products
              </FieldLabel>
              <FieldDescription className="mt-0.5 truncate text-[10px] sm:text-xs">
                Fish name, river, seller, or origin
              </FieldDescription>
            </div>
            <Badge variant="secondary">
              {resultCount} result{resultCount === 1 ? "" : "s"}
            </Badge>
          </div>

          <InputGroup className="h-10 rounded-xl bg-background shadow-xs">
            <InputGroupAddon className="pl-3">
              <Search aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              id="catalog-search"
              name="q"
              defaultValue={defaultQuery ?? ""}
              placeholder="Try Hilsa or Padma River…"
              className="text-sm font-medium"
              autoComplete="off"
            />
            <InputGroupAddon align="inline-end" className="gap-1 pr-1">
              {hasQuery ? (
                <InputGroupButton
                  render={
                    <Link href={createClearSearchHref(preservedParams)} />
                  }
                  nativeButton={false}
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Clear product search"
                >
                  <X />
                </InputGroupButton>
              ) : null}
              <InputGroupButton
                type="submit"
                variant="default"
                size="sm"
                aria-label="Search products"
              >
                <Search data-icon="inline-start" />
                Search
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </form>
  );
}

