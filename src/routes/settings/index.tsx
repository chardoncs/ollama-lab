import { component$, useSignal } from '@builder.io/qwik'
import { en } from '~/settings/names/en'

export default component$(() => {
  const restarting = useSignal(false)
  const t = en

  return (
    <div class="px-2 py-2 md:pt-10 md:pb-4 flex flex-col mx-auto max-w-screen-sm h-dvh">
      <div class="overflow-y-auto flex flex-col gap-2 grow">
      </div>
    </div>
  );
});
