<script lang="ts" module>
  export interface DisplayModelListItem {
    name: string
    status?: "inProgress" | "failure"
    message?: string
    completedSize?: number
    totalSize?: number
    modifiedAt?: Date
  }
</script>

<script lang="ts">
  import { cn } from "$lib/utils"
  import { onMount } from "svelte"
  import { toast } from "svelte-sonner"
  import { modelList, modelListStatus } from "$lib/stores/model-list"
  import PullModel from "./model-list/pull-model.svelte"
  import Loading from "../custom-ui/loading.svelte"
  import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
  import { CircleAlertIcon, RefreshCwIcon } from "lucide-svelte"
  import { Button } from "../ui/button"
  import ModelListItem from "./model-list/model-list-item.svelte"
  import { currentModel } from "$lib/stores/models"
  import { pullModelTasks } from "$lib/stores/pull-model"

  onMount(() => {
    modelList.reload()
  })

  let modelNameList = $derived($modelList.map(({ name }) => name))

  let displayModelList = $derived<DisplayModelListItem[]>([
    ...Object.entries($pullModelTasks)
      .filter(([name,]) => !modelNameList.includes(name))
      .map(([name, item]) => {
        switch (item.type) {
          case "inProgress":
            return {
              name,
              status: "inProgress",
              message: item.message,
              completedSize: item.completed === null ? undefined : item.completed,
              totalSize: item.total === null ? undefined : item.total,
            } satisfies DisplayModelListItem
          case "failure":
            return {
              name,
              message: item.message ?? undefined,
              status: "failure",
            } satisfies DisplayModelListItem
          case "success":
            return {
              name,
            } satisfies DisplayModelListItem
          case "canceled":
            return {
              name,
              status: "failure",
              message: item.message ?? undefined,
            } satisfies DisplayModelListItem
        }
      }),
    ...$modelList.map((item) => ({
      name: item.name,
      totalSize: item.size,
      modifiedAt: item.modified_at,
    } satisfies DisplayModelListItem)),
  ])
</script>

<div class="w-full h-full flex flex-col">
  <div class="sticky py-4 px-3 flex-shrink-0 flex place-items-center backdrop-blur-lg bg-background/50">
    <h2 class="text-lg font-bold select-none flex-grow">Models</h2>
    <div class="flex-shrink-0">
      <Button
        variant="outline"
        size="icon"
        disabled={$modelListStatus === "fetching"}
        title={$modelListStatus === "fetching" ? "Refreshing..." : "Refresh model list"}
        onclick={() => {
          const reloadPromise = modelList.reload()

          toast.promise(reloadPromise, {
            loading: "Refreshing model list...",
            success: "Model list refreshed.",
            error: (err) => {
              return `Failed to refresh model list: ${err}`
            },
          })
        }}
      >
        <RefreshCwIcon 
          class={cn(
            $modelListStatus === "fetching" && "animate-spin",
          )}
        />
      </Button>
      <PullModel />
    </div>
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events  -->
  <div
    class="flex-grow overflow-y-scroll"
    onclick={() => {
      currentModel.set(undefined)
    }}
  >
    <div class="flex flex-col gap-2 px-2">
      {#if $modelListStatus === "fetching"}
        <Loading content="Loading..." />
      {/if}
      {#if $modelListStatus === "error"}
        <Alert class="bg-destructive text-destructive-foreground border-destructive">
          <CircleAlertIcon class="size-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to fetch the model list.
          </AlertDescription>
        </Alert>
      {/if}
      {#each displayModelList as { name, message, status, completedSize, totalSize, modifiedAt }, index (name)}
        <ModelListItem {name} {completedSize} {totalSize} {modifiedAt} {message} {status} {index} />
      {/each}
    </div>
  </div>
</div>
