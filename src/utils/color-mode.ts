import { type Signal, useVisibleTask$ } from "@builder.io/qwik"
import { Mode } from "~/contexts/mode-context"

export function useModeWatcher(modeSignal: Signal<Mode>) {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // TODO: Handle flashing light mode
    const modeValue = track(modeSignal)
    const preferredMode = modeValue === "system" ? (
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    ) : modeValue

    const root = document.body

    if (preferredMode === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  })
}
