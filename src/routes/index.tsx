import { component$ } from "@qwik.dev/core"
import type { DocumentHead } from "@qwik.dev/router"

export const head: DocumentHead = {
  title: "Sessions | Ollama Lab",
}

export default component$(() => {
  return (
    <>
      <h1>Hi 👋</h1>
      <div>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
      </div>
    </>
  )
})
