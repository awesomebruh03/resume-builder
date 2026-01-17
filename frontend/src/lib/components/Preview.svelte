<script>
  import { onMount, tick } from 'svelte';
  import { design } from '../stores/designStore';
  import { resume } from '../stores/resumeStore';
  import { flattenResume, paginateBlocks } from '../../lib/utils/paginator';
  import TemplateIvy from './templates/TemplateIvy.svelte';

  const sizes = {
    A4: { w: '210mm', h: '297mm' },
    Letter: { w: '215.9mm', h: '279.4mm' },
  };

  $: currentSize = sizes[$design.pageSize] || sizes.A4;

  let pages = [];
  let ghostContainer;

  async function runPagination() {
    if ($design.template !== 'ivy') return;

    const allBlocks = flattenResume($resume, $design.sectionOrder);

    // 1. Render Ghost
    pages = [allBlocks];
    await tick();

    // 2. Measure The "Container" (Find out exactly how many PX is 297mm)
    const pagePixelHeight = ghostContainer.getBoundingClientRect().height;

    // Calculate Content Area (Page Height - Top/Bottom Padding)
    const paddingMm = $design.pageMargin * 2;
    const pageHeightMm = $design.pageSize === 'Letter' ? 279.4 : 297;

    // Ratio: If 297mm = 1122px, then PaddingPx = (PaddingMm / 297) * 1122
    const paddingPx = (paddingMm / pageHeightMm) * pagePixelHeight;

    // Safety Buffer (Prevent bleeding at the very edge)
    const safetyBufferPx = 20;

    const maxContentHeightPx = pagePixelHeight - paddingPx - safetyBufferPx;

    // 3. Measure Blocks (INCLUDING MARGINS!)
    const heightMap = {};
    allBlocks.forEach((block) => {
      const el = ghostContainer.querySelector(`#block-${block.id}`);
      if (el) {
        // Get accurate style (height + margin)
        const style = window.getComputedStyle(el);
        const marginTop = parseFloat(style.marginTop) || 0;
        const marginBottom = parseFloat(style.marginBottom) || 0;

        heightMap[block.id] = el.offsetHeight + marginTop + marginBottom;
      }
    });

    // 4. Run Logic
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
      width: {currentSize.w};
      height: {currentSize.h};
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
    id="print-container"
    class="flex-1 w-full overflow-y-auto flex flex-col items-center gap-10 custom-scrollbar pb-20"
  >
    {#if $design.template === 'ivy'}
      {#each pages as pageBlocks, i}
        <div class="relative group">
          <div
            class="resume-paper bg-white shadow-2xl relative origin-top overflow-hidden"
            style="
               width: {currentSize.w};
               height: {currentSize.h};
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
