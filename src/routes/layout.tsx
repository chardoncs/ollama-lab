import { component$, Slot } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import { Toaster } from "qwik-sonner"
import { AppBar } from "~/components/app-bar/app-bar"
import { ModeWatcher } from "~/components/mode-watcher/mode-watcher"
import { useModeContextProvider } from "~/contexts/mode-context"

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

  return (
    <div class="contents">
      <ModeWatcher />
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
