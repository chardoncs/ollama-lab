import { component$, type QRL, Slot } from "@qwik.dev/core"
import { Link } from "@qwik.dev/router"
import { cn } from "~/utils"

export interface TabLinkProps {
  active?: boolean
  href?: string
  name: string
  onClick$?: QRL<() => void>
}

export const TabLink = component$<TabLinkProps>(({ active, href, name, onClick$ }) => {
  return (
    <div class={cn(
      "group flex rounded cursor-pointer",
      active && "bg-secondary",
    )}>
      <div class="py-1">
        <hr class={cn(
          "border h-full border-transparent rounded-full",
          active ? "border-primary" : "group-hover:border-secondary",
        )} />
      </div>

      <Link
        href={href ?? ""}
        aria-label={name}
        title={name}
        draggable={false}
        class="p-3"
        onClick$={onClick$}
      >
        <Slot />
      </Link>
    </div>
  )
})
