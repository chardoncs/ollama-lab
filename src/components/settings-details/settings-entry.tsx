import { component$, useComputed$, useResource$ } from "@builder.io/qwik"
import { en } from "~/settings/names/en"
import { TypeDetail, settingsSchema } from "~/settings/schema"
import { cn } from "~/utils"

export interface SettingsEntryProps {
  key: string
  subkey: string
}

export const SettingsEntry = component$<SettingsEntryProps>(({ key, subkey }) => {
  const t = en

  const id = useComputed$(() => `${key}.${subkey}`)
  const title = useComputed$(() => t[id.value])

  const schema = useResource$(({ track }) => {
    const keyValue = track(() => key)
    const subkeyValue = track(() => subkey)

    return settingsSchema?.[key]?.[subkey] as TypeDetail | undefined
  })

  return (
    <div class={cn(
      "px-2 py-2",
    )}>
    </div>
  )
})
