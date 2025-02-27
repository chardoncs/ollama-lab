import { component$ } from "@builder.io/qwik"
import { Loader2Icon } from "~/integrations/react/lucide-icons"
import { cn } from "~/utils"

export interface LoaderProps {
  class?: string
}

export const Loader = component$<LoaderProps>(({ class: className }) => {
  return (
    <Loader2Icon
      className={cn(
        "animate-spin",
        className,
      )}
    />
  )
})
