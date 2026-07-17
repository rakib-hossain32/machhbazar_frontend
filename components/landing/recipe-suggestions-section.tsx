import { recipes } from "@/components/landing/landing-data";
import { SectionHeading } from "@/components/landing/section-heading";
import { ArrowUpRight, ChefHat, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function RecipeSuggestionsSection() {
  return (
    <section className="bg-surface-muted py-16 sm:py-20" aria-labelledby="recipes-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 xl:px-0">
        <div id="recipes-title">
          <SectionHeading
            eyebrow="From market to table"
            title="Cook the catch with confidence"
            description="Practical recipes matched to fish currently available in the marketplace."
            href="/recipes"
            linkLabel="Browse all recipes"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {recipes.map((recipe, index) => (
            <article key={recipe.slug} className="group overflow-hidden rounded-lg border border-border bg-surface">
              <Link href={`/recipes/${recipe.slug}`} className="relative block aspect-[1.28] overflow-hidden bg-secondary">
                <Image
                  src={recipe.image}
                  alt={`${recipe.title} plated dish`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-md bg-market-rail/90 px-2.5 py-1.5 text-[10px] font-bold tracking-[0.08em] text-market-rail-ink uppercase backdrop-blur">Pairs with {recipe.fish}</span>
                <span className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-md bg-coral text-white transition-transform group-hover:-translate-y-1"><ArrowUpRight className="size-4" /></span>
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-4 text-[11px] font-semibold text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Clock3 className="size-3.5 text-warning" /> {recipe.time}</span>
                  <span className="inline-flex items-center gap-1.5"><ChefHat className="size-3.5 text-primary" /> {recipe.difficulty}</span>
                  <span className="ml-auto font-mono text-[9px] text-muted-foreground/60">0{index + 1}</span>
                </div>
                <Link href={`/recipes/${recipe.slug}`}><h3 className="mt-4 font-heading text-2xl leading-[1.02] font-semibold text-ink transition-colors group-hover:text-primary">{recipe.title}</h3></Link>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{recipe.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
