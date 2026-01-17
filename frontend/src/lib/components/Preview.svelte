<script>
  import { onMount, tick } from 'svelte';
  import { design } from '../stores/designStore';
  import { resume } from '../stores/resumeStore';
  import { flattenResume, paginateBlocks } from '../utils/paginator';
  import TemplateIvy from './templates/TemplateIvy.svelte';

  // 1. Define Sizes
  const sizes = {
    A4: { w: '210mm', h: '297mm', h_mm: 297 },
    Letter: { w: '215.9mm', h: '279.4mm', h_mm: 279.4 },
  };

  // 2. Reactively get the current size object
  $: currentSize = sizes[$design.pageSize] || sizes.A4;

  let pages = [];
  let ghostContainer;

  // --- THE ENGINE ---
  async function runPagination() {
    if ($design.template !== 'ivy') return;

    const allBlocks = flattenResume($resume, $design.sectionOrder);

    // Render Ghost
    pages = [allBlocks];
    await tick();

    // Measure Heights
    const heightMap = {};
    allBlocks.forEach((block) => {
      const el = ghostContainer.querySelector(`#block-${block.id}`);
      if (el) heightMap[block.id] = el.offsetHeight;
    });

    // --- NEW: CALCULATE MAX HEIGHT ---
    // 1mm is approx 3.78px at 96 DPI
    const MM_TO_PX = 3.78;

    // Total Height in mm (297 or 279.4)
    const pageHeightMm = currentSize.h_mm;

    // Content Height = Page Height - (Top Margin + Bottom Margin)
    // We add a tiny buffer (-5mm) to be safe and prevent footer bleeding
    const maxContentHeightMm = pageHeightMm - $design.pageMargin * 2 - 5;

    // Convert to Pixels for the allocator
    const maxContentHeightPx = maxContentHeightMm * MM_TO_PX;

    // Run Logic with dynamic height
    pages = paginateBlocks(allBlocks, heightMap, maxContentHeightPx);
  }

  $: if ($resume || $design) {
    runPagination();
  }
</script>

<div
  class="flex flex-col items-center h-full w-full bg-[#0e0e0e] relative overflow-hidden py-10"
>
  <div
    bind:this={ghostContainer}
    class="absolute top-0 left-0 opacity-0 pointer-events-none bg-white overflow-hidden"
    style="
      width: {currentSize.w}; /* <--- FIXED */
      padding: {$design.pageMargin}mm;
      --font-body: {$design.fontBody}; 
      --font-size: {$design.fontSize}pt;
      --line-height: {$design.lineHeight};
    "
  >
    {#if $design.template === 'ivy'}
      <TemplateIvy blocks={flattenResume($resume, $design.sectionOrder)} />
    {/if}
  </div>

  <div
    class="flex-1 w-full overflow-y-auto flex flex-col items-center gap-10 custom-scrollbar pb-20"
  >
    {#if $design.template === 'ivy'}
      {#each pages as pageBlocks, i}
        <div class="relative group">
          <div
            id="resume-paper"
            class="bg-white shadow-2xl relative origin-top"
            style="
               width: {currentSize.w};       /* <--- FIXED */
               min-height: {currentSize.h};  /* <--- FIXED */
               padding: {$design.pageMargin}mm;
               transform: scale(0.65);
               margin-bottom: -100px;
               
               --theme-color: {$design.themeColor}; 
               --text-color: {$design.textColor};
               --font-body: {$design.fontBody}; 
               --font-size: {$design.fontSize}pt;
               --line-height: {$design.lineHeight};
             "
          >
            <TemplateIvy blocks={pageBlocks} />
          </div>

          <div
            class="absolute top-0 -left-10 text-gray-500 font-mono text-xs opacity-50"
          >
            PAGE {i + 1}
          </div>
        </div>
      {/each}
    {:else}
      <div class="text-white">Template not updated for pagination yet</div>
    {/if}
  </div>
</div>
