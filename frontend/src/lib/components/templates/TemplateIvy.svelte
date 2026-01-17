<script>
  import { design } from '../../stores/designStore';

  // DATA PROP: Received from the Paginator
  export let blocks = [];
</script>

<div
  class="h-full w-full bg-white text-gray-800"
  style="
    /* The Parent Container controls the base size and color now */
    font-family: var(--font-body, serif); 
    line-height: var(--line-height, 1.5);
    font-size: var(--font-size, 10.5pt);
    color: var(--text-color);
  "
>
  {#each blocks as block (block.id)}
    <div id="block-{block.id}" class="mb-4">
      {#if block.type === 'header'}
        <div class="text-center mb-8">
          <h1
            class="font-bold uppercase tracking-widest mb-2"
            style="font-size: 2.5em; line-height: 1.1;"
          >
            {block.data.name}
          </h1>

          <div class="italic mb-2 opacity-80" style="font-size: 1.1em;">
            {block.data.title}
          </div>

          <div
            class="flex flex-wrap justify-center gap-2 opacity-75"
            style="font-size: 0.85em;"
          >
            {#if block.data.email}<span>{block.data.email}</span>{/if}
            {#if block.data.phone}<span>• {block.data.phone}</span>{/if}
            {#if block.data.location}<span>• {block.data.location}</span>{/if}
            {#each block.data.links as link}<span>• {link}</span>{/each}
          </div>
        </div>
      {:else if block.type === 'section-title'}
        <div class="mt-2">
          <h2
            class="section-title text-center font-bold uppercase tracking-widest border-b-2 pb-1 mb-4"
            style="
                border-color: var(--theme-color);
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
        <div>
          <div class="flex justify-between items-baseline font-bold">
            <span style="font-size: 1.2em;">{block.data.company}</span>
            <span class="font-normal opacity-75" style="font-size: 0.85em;">
              {block.data.location}
            </span>
          </div>
          <div class="flex justify-between items-baseline mb-2">
            <span class="italic font-medium opacity-90">{block.data.title}</span
            >
            <span class="opacity-75" style="font-size: 0.85em;"
              >{block.data.date}</span
            >
          </div>
          <div class="rich-text opacity-90">{@html block.data.description}</div>
        </div>
      {:else if block.type === 'education'}
        <div>
          <div class="flex justify-between font-bold">
            <span style="font-size: 1.1em;">{block.data.school}</span>
            <span class="font-normal opacity-75" style="font-size: 0.85em;"
              >{block.data.date}</span
            >
          </div>
          <div class="italic mt-1 opacity-90" style="font-size: 0.9em;">
            {block.data.degree} in {block.data.major}
          </div>
        </div>
      {:else if block.type === 'skills'}
        <div class="text-center rich-text">{@html block.content}</div>
      {:else if block.type === 'custom'}
        <div class="mb-4">
          <div class="flex justify-between font-bold" style="font-size: 0.9em;">
            <span>{block.data.title}</span>
            <span class="font-normal opacity-75">{block.data.date}</span>
          </div>
          <div class="italic opacity-80" style="font-size: 0.9em;">
            {block.data.subtitle}
          </div>
          <div class="rich-text opacity-90 mt-1">
            {@html block.data.description}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  :global(.rich-text ul) {
    list-style-type: disc;
    margin-left: 1.2em;
    margin-top: 0.25em;
  }
  :global(.rich-text p) {
    margin-bottom: 0.25em;
  }
  :global(.rich-text) {
    font-size: 1em;
  }
</style>
