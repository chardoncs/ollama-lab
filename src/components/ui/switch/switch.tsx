import { type ButtonHTMLAttributes, QRL, component$, useSignal, useTask$ } from "@builder.io/qwik"
import { cn } from "~/utils"
import { HiddenFormControl } from "./hidden-form-control"

interface SwitchThumbProps {
  checked?: boolean
}

const SwitchThumb = component$<SwitchThumbProps>(({ checked }) => {
  return (
    <div class={cn(
      "pointer-events-none h-5 w-5 rounded-full bg-background shadow-lg transition-transform",
      checked ? "translate-x-5" : "translate-x-0",
    )}></div>
  )
})

export type SwitchProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean
  defaultChecked?: boolean
  required?: boolean
  onCheckedChange$?: QRL<(checked: boolean) => void>
  formControl?: boolean
}

export const Switch = component$<SwitchProps>(({
  checked: forceChecked, class: className, defaultChecked, required, onCheckedChange$, ref, formControl = false,
  ...props
}) => {
  const checked = useSignal(forceChecked || defaultChecked)

  useTask$(({ track }) => {
    const checkedValue = track(checked)
    if (forceChecked !== undefined && checkedValue !== forceChecked) {
      checked.value = forceChecked
    }
  })

  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={checked.value}
        aria-required={required}
        class={cn(
          "rounded-full inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border-2 border-transparent transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
          checked.value ? "bg-primary" : "bg-input",
          className,
        )}
        ref={ref}
        {...props}
        onClick$={() => {
          if (forceChecked !== undefined) {
            return
          }

          checked.value = !checked.value
        }}
      >
        <SwitchThumb checked={checked.value} />
      </button>

      {formControl && (
        <HiddenFormControl checked={checked.value} />
      )}
    </>
  )
})
