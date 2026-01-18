<script>
  import { design } from '../../stores/designStore';

  // DATA PROP: Received from the Paginator
  export let blocks = [];
</script>

<div
  class="h-full w-full bg-white text-black"
  style="
    font-family: var(--font-body, serif); 
    line-height: var(--line-height, 1.5);
    font-size: var(--font-size, 10.5pt); /* CONTROLLED BY SLIDER */
    color: var(--text-color);
  "
>
  {#each blocks as block (block.id)}
    <div id="block-{block.id}" class="mb-6">
      {#if block.type === 'header'}
        <header
          class="text-center border-b-2 pb-4 mb-6"
          style="border-color: var(--text-color);"
        >
          <h1
            class="font-bold uppercase tracking-wider mb-2"
            style="font-size: 2.2em; line-height: 1.1;"
          >
            {block.data.name}
          </h1>

          <div
            class="flex flex-wrap justify-center gap-3 opacity-90"
            style="font-size: 0.9em;"
          >
            {#if block.data.location}<span>{block.data.location}</span>{/if}
            {#if block.data.location && block.data.email}<span>|</span>{/if}

            {#if block.data.email}<span>{block.data.email}</span>{/if}
            {#if block.data.email && block.data.phone}<span>|</span>{/if}

            {#if block.data.phone}<span>{block.data.phone}</span>{/if}

            {#each block.data.links as link}
              <span>|</span>
              <span class="underline" style="color: var(--theme-color);"
                >{link}</span
              >
            {/each}
          </div>
        </header>
      {:else if block.type === 'section-title'}
        <div class="mt-4">
          <h2
            class="font-bold uppercase border-b mb-4 pb-1"
            style="
               border-color: gray;
               font-size: 1em; 
            "
          >
            {block.content}
          </h2>
        </div>
      {:else if block.type === 'summary'}
        <div class="text-justify rich-text">
          {@html block.content}
        </div>
      {:else if block.type === 'experience'}
        <div class="mb-4">
          <div class="flex justify-between items-baseline mb-1">
            <h3 class="font-bold" style="font-size: 1.1em;">
              {block.data.company}
            </h3>
            <span class="italic opacity-80" style="font-size: 0.9em;"
              >{block.data.location}</span
            >
          </div>
          <div class="flex justify-between items-baseline mb-2">
            <span class="font-bold italic opacity-90">{block.data.title}</span>
            <span class="opacity-80" style="font-size: 0.9em;"
              >{block.data.date}</span
            >
          </div>
          <div class="rich-text pl-0">{@html block.data.description}</div>
        </div>
      {:else if block.type === 'education'}
        <div class="mb-3">
          <div class="flex justify-between">
            <span class="font-bold">{block.data.school}</span>
            <span style="font-size: 0.9em;">{block.data.date}</span>
          </div>
          <div>{block.data.degree} in {block.data.major}</div>
        </div>
      {:else if block.type === 'skills'}
        <div class="rich-text">{@html block.content}</div>
      {:else if block.type === 'custom'}
        <div class="mb-4">
          <div class="flex justify-between font-bold">
            <span>{block.data.title}</span>
            <span class="font-normal opacity-80" style="font-size: 0.9em;"
              >{block.data.date}</span
            >
          </div>
          {#if block.data.subtitle}
            <div class="italic opacity-80" style="font-size: 0.9em;">
              {block.data.subtitle}
            </div>
          {/if}
          <div class="rich-text mt-1">{@html block.data.description}</div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  :global(.rich-text ul) {
    list-style-type: disc;
    margin-left: 1.5rem;
  }
  :global(.rich-text li) {
    margin-bottom: 0.25rem;
  }
  :global(.rich-text) {
    font-size: 1em;
  }
</style>
