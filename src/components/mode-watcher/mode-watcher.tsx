import { component$, useVisibleTask$ } from "@builder.io/qwik"
import { useModeContext } from "~/contexts/mode-context"

export const ModeWatcher = component$(() => {
  const mode = useModeContext()

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    // TODO: Handle flashing light mode
    const modeValue = track(mode)
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

  return <></>
})
