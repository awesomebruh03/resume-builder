<script>
  import Sidebar from './ui/Sidebar.svelte';
  import { design } from '../stores/designStore';
  import 'iconify-icon';
  import ColorPicker from 'svelte-awesome-color-picker';

  // --- NEW IMPORTS FOR DRAG & DROP ---
  import { dndzone } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';

  // Import Thumbnails
  import MiniMinimal from './ui/MiniMinimal.svelte';
  import MiniModern from './ui/MiniModern.svelte';
  import MiniIvy from './ui/MiniIvy.svelte';
  import MiniHighPerformer from './ui/MiniHighPerformer.svelte';

  const colors = ['#000000', '#3b82f6', '#06b6d4', '#ef4444', '#10b981', '#8b5cf6', '#f59e0b'];
  
  const templates = [
    { id: 'ivy', name: 'Ivy League', component: MiniIvy },
    { id: 'high-performer', name: 'High Performer', component: MiniHighPerformer },
    { id: 'minimal', name: 'Minimalist', component: MiniMinimal },
    { id: 'modern', name: 'Modern', component: MiniModern }
  ];
  
  const fontOptions = [
    { name: 'Modern Sans (Inter)', value: 'font-sans' },
    { name: 'Classic Serif (Times)', value: 'font-serif' },
    { name: 'Monospace (Code)', value: 'font-mono' },
  ];

  // --- DRAG & DROP LOGIC ---
  const flipDurationMs = 200;

  function handleDndConsider(e) {
    $design.sectionOrder = e.detail.items;
  }

  function handleDndFinalize(e) {
    $design.sectionOrder = e.detail.items;
  }
</script>

<Sidebar side="right">
  <div slot="sidebar" class="flex flex-col gap-6 p-4 pb-24 text-sm h-full overflow-y-auto custom-scrollbar">
    
    <section>
       <div class="flex items-center gap-2 mb-3">
        <iconify-icon icon="mdi:view-grid" class="text-amber-500"></iconify-icon>
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Templates</h3>
      </div>
      <div class="grid grid-cols-2 gap-3">
        {#each templates as t}
          <button 
            class="relative h-28 rounded-xl border-2 transition-all duration-200 overflow-hidden group text-left
            {$design.template === t.id ? 'border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)] scale-[1.02]' : 'border-[#27272a] bg-[#18181b] opacity-80 hover:opacity-100 hover:border-gray-500'}"
            on:click={() => $design.template = t.id}
          >
            <svelte:component this={t.component} color={$design.themeColor} />
            <div class="absolute bottom-0 w-full bg-black/80 backdrop-blur-sm py-1 px-2 border-t border-white/10">
               <span class="text-[10px] font-bold text-white uppercase tracking-wider">{t.name}</span>
            </div>
            {#if $design.template === t.id}
               <div class="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]"></div>
            {/if}
          </button>
        {/each}
      </div>
    </section>

    <div class="h-px bg-[#27272a] w-full"></div>

    <section>
       <div class="flex items-center gap-2 mb-3">
        <iconify-icon icon="mdi:palette" class="text-amber-500"></iconify-icon>
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Accent Color</h3>
      </div>
      <div class="flex flex-wrap gap-3 items-center">
        {#each colors as color}
          <button 
            class="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 shadow-lg relative"
            style="background-color: {color}; border-color: {$design.themeColor === color ? 'white' : 'transparent'};"
            on:click={() => $design.themeColor = color}
          >
             {#if $design.themeColor === color}
               <iconify-icon icon="mdi:check" class="text-white text-xs absolute inset-0 m-auto"></iconify-icon>
             {/if}
          </button>
        {/each}
        <div class="custom-color-picker-wrapper">
            <ColorPicker bind:hex={$design.themeColor} isDialog={true} --picker-indicator-size="20px" --picker-width="200px" --picker-height="200px">
                <div class="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center bg-linear-to-br from-gray-700 to-black cursor-pointer hover:border-white transition-colors" title="Custom Color">
                   <iconify-icon icon="mdi:eyedropper" class="text-gray-300 text-xs"></iconify-icon>
                </div>
            </ColorPicker>
        </div>
      </div>
      <div class="mt-2 flex items-center gap-2">
         <span class="text-xs text-gray-500">Active:</span>
         <span class="text-xs font-mono text-amber-500">{$design.themeColor}</span>
      </div>
    </section>

    <div class="h-px bg-[#27272a] w-full"></div>

    <section>
       <div class="flex items-center gap-2 mb-3">
        <iconify-icon icon="mdi:format-font" class="text-amber-500"></iconify-icon>
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Typography</h3>
      </div>
       <div class="flex flex-col gap-5">
         <div class="form-control w-full">
            <label class="label py-1"><span class="label-text text-xs text-gray-400">Font Family</span></label>
            <select class="select select-bordered select-sm w-full bg-[#18181b] border-[#27272a] text-gray-300 focus:outline-none focus:border-amber-500" bind:value={$design.fontBody}>
               {#each fontOptions as font}
                 <option value={font.value}>{font.name}</option>
               {/each}
            </select>
         </div>
         <div class="form-control w-full">
           <div class="flex justify-between mb-1">
              <span class="text-xs text-gray-500">Font Size</span>
              <span class="text-xs font-mono text-amber-500">{$design.fontSize}pt</span>
           </div>
           <input type="range" min="9" max="14" step="0.5" class="range range-xs range-accent" bind:value={$design.fontSize} />
         </div>
         <div class="form-control w-full">
           <div class="flex justify-between mb-1">
              <span class="text-xs text-gray-500">Line Spacing</span>
              <span class="text-xs font-mono text-amber-500">{$design.lineHeight}</span>
           </div>
           <input type="range" min="1.0" max="2.0" step="0.1" class="range range-xs range-accent" bind:value={$design.lineHeight} />
         </div>
         <div class="form-control w-full">
           <div class="flex justify-between mb-1">
              <span class="text-xs text-gray-500">Page Margin</span>
              <span class="text-xs font-mono text-amber-500">{$design.pageMargin}mm</span>
           </div>
           <input type="range" min="10" max="35" step="5" class="range range-xs range-accent" bind:value={$design.pageMargin} />
         </div>
        <div class="form-control w-full mt-2">
             <div class="flex justify-between items-center mb-2">
               <span class="text-xs text-gray-400">Body Text Color</span>
               <span class="text-[10px] font-mono text-amber-500">{$design.textColor}</span>
             </div>
             <div class="flex justify-start relative">
                  <ColorPicker bind:hex={$design.textColor} isDialog={true} --picker-indicator-size="15px" --picker-width="180px" --picker-height="180px">
                      <button class="h-8 flex items-center gap-3 px-3 rounded border border-gray-600 bg-[#18181b] hover:border-white transition-all hover:bg-[#27272a]" title="Pick text color">
                        <div class="w-4 h-4 rounded-full border border-gray-500 shadow-sm" style="background-color: {$design.textColor}"></div>
                        <span class="text-xs text-gray-400">Change Color</span>
                      </button>
                  </ColorPicker>
             </div>
         </div>
       </div>
    </section>

    <div class="h-px bg-[#27272a] w-full"></div>

    <section>
       <div class="flex items-center gap-2 mb-3">
        <iconify-icon icon="mdi:sort" class="text-amber-500"></iconify-icon>
        <h3 class="text-xs font-bold text-gray-400 uppercase tracking-widest">Section Order</h3>
      </div>

       <div 
         class="flex flex-col gap-2"
         use:dndzone={{items: $design.sectionOrder, flipDurationMs}} 
         on:consider={handleDndConsider} 
         on:finalize={handleDndFinalize}
       >
          {#each $design.sectionOrder as section (section.id)}
             <div 
               class="flex justify-between items-center bg-[#18181b] p-3 rounded-md border border-[#27272a] hover:border-gray-500 transition-colors group cursor-move shadow-sm select-none"
               animate:flip={{duration: flipDurationMs}}
             >
                <div class="flex items-center gap-3">
                   <iconify-icon icon="mdi:drag" class="text-gray-600 group-hover:text-amber-500 transition-colors text-lg"></iconify-icon>
                   <span class="text-xs font-bold text-gray-300 group-hover:text-white">{section.name}</span>
                </div>
                
                <button class="btn btn-xs btn-circle btn-ghost text-gray-600 hover:text-white" title="Toggle Visibility">
                    <iconify-icon icon="mdi:eye"></iconify-icon>
                </button>
             </div>
          {/each}
       </div>
    </section>

  </div>

  <div slot="footer" class="p-4 border-t border-[#27272a] bg-[#0e0e0e]/95 backdrop-blur absolute bottom-0 w-full z-10 flex flex-col gap-2">
      <button class="btn btn-primary w-full shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] border-none text-white gap-2">
         <iconify-icon icon="mdi:file-pdf-box" class="text-lg"></iconify-icon>
         Export PDF
      </button>
      <div class="grid grid-cols-2 gap-2">
         <button class="btn btn-xs btn-outline border-gray-700 text-gray-400 hover:text-white">Save JSON</button>
         <button class="btn btn-xs btn-outline border-gray-700 text-gray-400 hover:text-white">Load JSON</button>
      </div>
  </div>
</Sidebar>

<style>
  /* GLOBAL STYLES FOR COLOR PICKER (DARK MODE) */
  :global(.color-picker) {
     background: #18181b !important;
     border: 1px solid #27272a !important;
     box-shadow: 0 10px 25px rgba(0,0,0,0.5) !important;
     border-radius: 12px !important;
     z-index: 9999;
  }
  :global(.color-picker input) {
     background: #0e0e0e !important;
     color: white !important;
     border: 1px solid #27272a !important;
     font-family: monospace;
     border-radius: 4px;
     padding: 2px 4px;
  }
  :global(.color-picker .slider) {
      margin-top: 10px;
  }
</style>