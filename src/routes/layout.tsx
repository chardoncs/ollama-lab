import { component$, isBrowser, Slot, useTask$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { Toaster } from "qwik-sonner"
import { AppBar } from "~/components/app-bar/app-bar"
import { useModeContext, useModeContextProvider } from "~/contexts/mode-context"

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export default component$(() => {
  useModeContextProvider()

  const mode = useModeContext()

  useTask$(({ track }) => {
    if (isBrowser) {
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
    }
  })

  return (
    <div class="contents">
      <Toaster
        closeButton
        richColors
        class="font-sans-inter"
      />

      <div class="flex flex-row w-dvw h-dvh">
        <AppBar />

        <div class="flex-grow">
          <Slot />
        </div>
      </div>
    </div>
  )
})
