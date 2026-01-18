<script>
  import { design } from '../../stores/designStore';

  // DATA PROP: Received from the Paginator
  export let blocks = [];
</script>

<div
  class="h-full w-full bg-white text-slate-700"
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
        <header class="mb-10">
          <h1
            class="font-extrabold text-slate-900 uppercase tracking-tight leading-none mb-2"
            style="font-size: 3.5em;"
          >
            {block.data.name}
          </h1>

          <h2 class="font-medium text-slate-500 mb-6" style="font-size: 1.5em;">
            {block.data.title}
          </h2>

          <div
            class="flex flex-wrap gap-y-2 gap-x-6 text-slate-500 border-y border-slate-200 py-3"
            style="font-size: 0.9em;"
          >
            {#if block.data.email}
              <div>
                <span class="font-bold text-slate-900 mr-1">Email:</span>
                {block.data.email}
              </div>
            {/if}
            {#if block.data.phone}
              <div>
                <span class="font-bold text-slate-900 mr-1">Phone:</span>
                {block.data.phone}
              </div>
            {/if}
            {#if block.data.location}
              <div>
                <span class="font-bold text-slate-900 mr-1">Location:</span>
                {block.data.location}
              </div>
            {/if}
            {#each block.data.links as link}
              <div>
                <span class="font-bold text-slate-900 mr-1">Link:</span>
                <span
                  class="text-blue-600 underline decoration-blue-300 underline-offset-2"
                  >{link}</span
                >
              </div>
            {/each}
          </div>
        </header>
      {:else if block.type === 'section-title'}
        <div class="mt-6">
          <h3
            class="font-bold text-slate-900 uppercase tracking-widest border-b-2 border-slate-900 pb-2 mb-6"
            style="font-size: 0.9em;"
          >
            {block.content}
          </h3>
        </div>
      {:else if block.type === 'summary'}
        <div class="text-slate-700 leading-relaxed rich-text-content">
          {@html block.content}
        </div>
      {:else if block.type === 'experience'}
        <div class="mb-4">
          <div class="flex justify-between items-baseline mb-1">
            <h4 class="font-bold text-slate-800" style="font-size: 1.2em;">
              {block.data.title}
            </h4>
            <span
              class="font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 whitespace-nowrap"
              style="font-size: 0.85em;"
            >
              {block.data.date}
            </span>
          </div>

          <div
            class="text-slate-500 font-medium mb-3"
            style="font-size: 0.95em;"
          >
            {block.data.company} — {block.data.location}
          </div>

          <div class="text-slate-700 leading-relaxed rich-text-content">
            {@html block.data.description}
          </div>
        </div>
      {:else if block.type === 'education'}
        <div class="mb-4">
          <div class="flex justify-between items-baseline">
            <div class="font-bold text-slate-800" style="font-size: 1.1em;">
              {block.data.school}
            </div>
            <div class="text-slate-600" style="font-size: 0.9em;">
              {block.data.date}
            </div>
          </div>
          <div style="font-size: 1em;">{block.data.degree}</div>
          <div class="italic text-slate-500" style="font-size: 0.9em;">
            {block.data.major}
          </div>
        </div>
      {:else if block.type === 'skills'}
        <div class="leading-relaxed rich-text-content">
          {@html block.content}
        </div>
      {:else if block.type === 'custom'}
        <div class="mb-4">
          <div
            class="flex justify-between font-bold text-slate-800"
            style="font-size: 1.1em;"
          >
            <span>{block.data.title}</span>
            <span class="font-normal text-slate-600" style="font-size: 0.85em;"
              >{block.data.date}</span
            >
          </div>
          {#if block.data.subtitle}
            <div class="text-slate-500 mb-1" style="font-size: 0.95em;">
              {block.data.subtitle}
            </div>
          {/if}
          <div class="text-slate-700 rich-text-content mt-1">
            {@html block.data.description}
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style>
  :global(.rich-text-content ul) {
    list-style-type: disc;
    margin-left: 1.2rem;
    margin-top: 0.25rem;
  }
  :global(.rich-text-content li) {
    margin-bottom: 0.25rem;
  }
  /* Inherit font size */
  :global(.rich-text-content) {
    font-size: 1em;
  }
</style>
