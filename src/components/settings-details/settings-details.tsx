import { component$, useSignal } from '@builder.io/qwik'
import { useSettings } from '~/contexts/settings';
import { en } from '~/settings/names/en'
import { settingsSchema } from '~/settings/schema';
import { SettingsEntry } from './settings-entry';

export const SettingsDetails = component$(() => {
  const restarting = useSignal(false)
  const t = en

  const settingsStore = useSettings()

  return (
    <div class="px-2 py-2 md:pt-10 md:pb-4 flex flex-col mx-auto max-w-screen h-dvh">
      <div class="overflow-y-auto flex flex-col gap-2 grow">
        {settingsStore.settings && Object.entries(settingsStore.settings).map(([key, section]) => (
          <div
            key={`settings-section-${key}`}
            class="flex flex-col gap-2"
          >
            <h2 class="font-bold">{t[key]}</h2>

            {Object.entries(section).map(([subkey,]) => settingsSchema[key][subkey] && (
              <SettingsEntry key={key} subkey={subkey} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});
