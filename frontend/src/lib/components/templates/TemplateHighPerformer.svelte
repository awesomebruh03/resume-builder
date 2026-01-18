<script>
  import { design } from '../../stores/designStore';

  // DATA PROP: Received from the Paginator
  export let blocks = [];
</script>

<div
  class="h-full w-full bg-white text-gray-800"
  style="
    font-family: var(--font-body, sans-serif); 
    line-height: var(--line-height, 1.5);
    font-size: var(--font-size, 10.5pt); /* CONTROLLED BY SLIDER */
    color: var(--text-color);
  "
>
  {#each blocks as block (block.id)}
    <div id="block-{block.id}" class="mb-6">
      {#if block.type === 'header'}
        <div
          class="mb-8 border-b-2 pb-6"
          style="border-color: var(--text-color);"
        >
          <h1
            class="font-thin tracking-tight uppercase text-gray-900 mb-1"
            style="font-size: 3em; line-height: 1;"
          >
            {block.data.name}
          </h1>

          <div
            class="font-medium mb-4"
            style="font-size: 1.25em; color: var(--theme-color);"
          >
            {block.data.title}
          </div>

          <div
            class="flex flex-wrap gap-x-6 gap-y-2 text-gray-500"
            style="font-size: 0.9em;"
          >
            {#if block.data.phone}
              <div class="flex items-center gap-1">
                <iconify-icon icon="mdi:phone"></iconify-icon>
                {block.data.phone}
              </div>
            {/if}
            {#if block.data.email}
              <div class="flex items-center gap-1">
                <iconify-icon icon="mdi:email"></iconify-icon>
                {block.data.email}
              </div>
            {/if}
            {#if block.data.location}
              <div class="flex items-center gap-1">
                <iconify-icon icon="mdi:map-marker"></iconify-icon>
                {block.data.location}
              </div>
            {/if}
            {#each block.data.links as link}
              <div class="flex items-center gap-1">
                <iconify-icon icon="mdi:link"></iconify-icon>
                {link}
              </div>
            {/each}
          </div>
        </div>
      {:else if block.type === 'section-title'}
        <div class="mt-4">
          <h2
            class="font-bold uppercase tracking-widest border-b-2 mb-4"
            style="
               border-color: var(--theme-color);
               font-size: 1em; 
               padding-bottom: 0.25em;
            "
          >
            {block.content}
          </h2>
        </div>
      {:else if block.type === 'summary'}
        <div class="text-justify rich-text leading-relaxed">
          {@html block.content}
        </div>
      {:else if block.type === 'experience'}
        <div class="mb-2">
          <div class="flex justify-between items-baseline mb-1">
            <h3 class="font-bold" style="font-size: 1.1em;">
              {block.data.title}
            </h3>
            <span
              class="font-medium"
              style="color: var(--theme-color); font-size: 0.9em;"
            >
              {block.data.company}
            </span>
          </div>

          <div class="flex gap-4 text-gray-500 mb-2" style="font-size: 0.8em;">
            <span class="flex items-center gap-1">
              <iconify-icon icon="mdi:calendar"></iconify-icon>
              {block.data.date}
            </span>
            <span class="flex items-center gap-1">
              <iconify-icon icon="mdi:map-marker"></iconify-icon>
              {block.data.location}
            </span>
          </div>

          <div class="rich-text">{@html block.data.description}</div>
        </div>
      {:else if block.type === 'education'}
        <div>
          <div class="flex justify-between items-baseline">
            <div
              class="font-bold"
              style="font-size: 1.1em; color: var(--theme-color);"
            >
              {block.data.degree}
            </div>
            <div class="text-gray-500" style="font-size: 0.85em;">
              {block.data.date}
            </div>
          </div>
          <div class="font-bold mb-1" style="font-size: 1em;">
            {block.data.school}
          </div>
        </div>
      {:else if block.type === 'skills'}
        <div class="rich-text">{@html block.content}</div>
      {:else if block.type === 'custom'}
        <div class="mb-4">
          <div class="flex justify-between font-bold" style="font-size: 1em;">
            <span>{block.data.title}</span>
            <span class="font-normal opacity-75" style="font-size: 0.9em;"
              >{block.data.date}</span
            >
          </div>
          {#if block.data.subtitle}
            <div class="text-gray-500 mb-1" style="font-size: 0.9em;">
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
    margin-left: 1rem;
    margin-top: 0.25rem;
  }
  :global(.rich-text li) {
    margin-bottom: 0.25rem;
  }
  :global(.rich-text) {
    font-size: 1em;
  }
</style>
