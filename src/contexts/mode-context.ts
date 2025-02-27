import { createContextId, Signal, useContext, useContextProvider, useSignal } from "@builder.io/qwik"

export type Mode = "dark" | "light" | "system"

export interface ModeProviderProps {
  defaultMode?: Mode
}

export const ModeContext = createContextId<Signal<Mode>>("app.mode-context")

export function useModeProvider() {
  const modeState = useSignal<Mode>("system")

  useContextProvider(ModeContext, modeState)
  return modeState
}

export function useMode() {
  const state = useContext(ModeContext)
  return state
}
