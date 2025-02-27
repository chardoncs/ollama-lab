import { createContextId, Signal, useContext, useContextProvider, useSignal } from "@builder.io/qwik"

export type Mode = "dark" | "light" | "system"

export interface ModeProviderProps {
  defaultMode?: Mode
}

export const ModeContext = createContextId<Signal<Mode>>("app.mode-context")

export function useModeContextProvider() {
  const modeState = useSignal<Mode>("system")

  useContextProvider(ModeContext, modeState)
}

export function useModeContext() {
  const state = useContext(ModeContext)
  return state
}
