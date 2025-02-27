import { component$ } from "@builder.io/qwik"

export interface HiddenFormControlProps {
  checked?: boolean
}

export const HiddenFormControl = component$<HiddenFormControlProps>(({ checked }) => {
  return (
    <input
      type="hidden"
      checked={checked}
    />
  )
})
