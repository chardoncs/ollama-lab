<script lang="ts">
  import Header from "./chat-panel/header.svelte"
  import ChatFeeds from "./chat-panel/chat-feeds.svelte"
  import PromptInput from "./chat-panel/prompt-input.svelte"
  import RegenFooter from "./chat-panel/regen-footer.svelte"

  let scrolledToBottom = $state(true)
</script>

<div class="flex flex-col w-full h-full">
  <Header />

  <div class="flex-grow px-4 py-2 w-full overflow-y-scroll">
    <ChatFeeds bind:autoScroll={scrolledToBottom} />
  </div>

  <RegenFooter />

  <div class="max-w-screen-lg w-full mx-auto">
    <PromptInput />
  </div>
</div>
