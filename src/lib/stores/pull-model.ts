import type { ProgressEvent } from "$lib/models/events/progress"
import { Channel } from "@tauri-apps/api/core"
import { writable } from "svelte/store"
import { modelList } from "./model-list"
import { currentModel } from "./models"

const internalPullTasks = writable<{ [id: string]: ProgressEvent }>({})

export const pullModelTasks = {
  subscribe: internalPullTasks.subscribe,
  clear(id?: string) {
    internalPullTasks.update((value) => {
      if (!id) {
        return {}
      }

      delete value[id]
      return value
    })
  },
  add(id: string, message: string) {
    internalPullTasks.update((value) => {
      if (!value[id]) {
        value[id] = {
          id,
          type: "inProgress",
          message,
        }
      }
      return value
    })
  },
  error(id: string, message: string) {
    internalPullTasks.update((value) => {
      if (value[id]) {
        value[id] = {
          id,
          type: "failure",
          message,
        }
      }
      return value
    })
  },
  channel(model: string) {
    const chan = new Channel<ProgressEvent>()
    chan.onmessage = (msg) => {
      internalPullTasks.update((value) => {
        value[model] = msg
        return value
      })

      switch (msg.type) {
        case "success":
          modelList.reload()
          this.clear(model)
          break

        case "canceled":
          currentModel.update(value => value === model ? undefined : value)
          this.clear(model)
          break

        default:
          break
      }
    }
    
    return chan
  },
}
