import { $, QRL, createContextId, useContext, useContextProvider, useStore } from "@builder.io/qwik"
import { getSettings } from "~/commands/settings"
import type { Settings } from "~/models/settings"

export interface SettingsStore {
  settings?: Settings
  reload: QRL<(store: SettingsStore) => Promise<void>>
}

const settingsContextId = createContextId<SettingsStore>("app.settings")

export function useSettingsProvider() {
  const settingsStore = useStore<SettingsStore>({
    settings: undefined,
    reload: $(async (store) => {
      store.settings = await getSettings()
    }),
  }, { deep: true })

  useContextProvider(settingsContextId, settingsStore)
  return settingsStore
}

export function useSettings() {
  return useContext<SettingsStore>(settingsContextId)
}
