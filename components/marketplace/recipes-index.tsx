import { recipes } from "@/components/marketplace/market-data";
import { MarketPageHeader, MarketSection } from "@/components/marketplace/page-shell";
import { ArrowUpRight, ChefHat, Clock3, Flame, Search, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RecipesIndex() {
  const featured = recipes[0];
  return (
    <>
      <MarketPageHeader eyebrow="Market kitchen" title="Cook the catch well" description="Practical recipes matched to fish available in the marketplace, with cut guidance and realistic preparation times." breadcrumbs={[{ label: "Recipes" }]} />
      <MarketSection className="py-8 lg:py-12">
        <Link href={`/recipes/${featured.slug}`} className="group grid overflow-hidden rounded-lg border border-border bg-market-rail text-market-rail-ink lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[360px] overflow-hidden"><Image src={featured.image} alt={`${featured.title} finished dish`} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /></div>
          <div className="flex flex-col justify-center p-6 sm:p-10"><p className="flex items-center gap-2 text-[10px] font-bold text-market-aqua uppercase"><Flame className="size-4" /> Featured this week</p><h2 className="mt-5 font-heading text-4xl leading-none font-semibold sm:text-5xl">{featured.title}</h2><p className="mt-5 text-sm leading-6 text-market-rail-ink/62">{featured.description}</p><div className="mt-7 flex gap-5 text-[10px] font-bold text-market-rail-ink/55"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-warning" /> {featured.time}</span><span className="flex items-center gap-1.5"><ChefHat className="size-3.5 text-coral" /> {featured.difficulty}</span></div><span className="mt-8 inline-flex items-center gap-2 text-xs font-bold">Cook this recipe <ArrowUpRight className="size-4" /></span></div>
        </Link>
      </MarketSection>

      <div className="border-y border-border bg-surface"><MarketSection className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2">{["All recipes", "Under 30 min", "River fish", "Sea fish", "Prawn"].map((filter, index) => <Link key={filter} href={index ? `/recipes?filter=${encodeURIComponent(filter)}` : "/recipes"} className={`rounded-md border px-3 py-2 text-[10px] font-bold ${index === 0 ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-ink"}`}>{filter}</Link>)}</div><form action="/recipes" className="flex h-10 items-center rounded-md border border-border px-3"><Search className="size-4 text-primary" /><input name="q" placeholder="Search recipes" className="w-44 bg-transparent px-2 text-xs outline-none" /></form></MarketSection></div>

      <MarketSection className="py-16 sm:py-20"><div className="mb-8"><p className="text-[10px] font-bold text-primary uppercase">Recipe collection</p><h2 className="mt-2 font-heading text-4xl font-semibold text-ink">Choose what to cook next</h2></div><div className="grid gap-5 md:grid-cols-3">{recipes.map((recipe, index) => <article key={recipe.slug} className="group overflow-hidden rounded-lg border border-border bg-surface"><Link href={`/recipes/${recipe.slug}`} className="relative block aspect-[1.25] overflow-hidden"><Image src={recipe.image} alt={`${recipe.title} plated dish`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" /><span className="absolute top-3 left-3 rounded-md bg-market-rail/90 px-2.5 py-1.5 text-[9px] font-bold text-market-rail-ink">PAIRS WITH {recipe.fish.toUpperCase()}</span></Link><div className="p-5"><div className="flex items-center gap-4 text-[10px] font-semibold text-muted-foreground"><span className="flex items-center gap-1.5"><Clock3 className="size-3.5 text-warning" /> {recipe.time}</span><span className="flex items-center gap-1.5"><Utensils className="size-3.5 text-primary" /> {recipe.difficulty}</span><span className="ml-auto font-mono">0{index + 1}</span></div><Link href={`/recipes/${recipe.slug}`}><h3 className="mt-4 font-heading text-2xl leading-none font-semibold text-ink group-hover:text-primary">{recipe.title}</h3></Link><p className="mt-3 text-xs leading-5 text-muted-foreground">{recipe.description}</p><Link href={`/recipes/${recipe.slug}`} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-primary">View recipe <ArrowUpRight className="size-3.5" /></Link></div></article>)}</div></MarketSection>
    </>
  );
}
