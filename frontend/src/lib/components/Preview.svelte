<script>
  // 1. Import ALL Templates
  import TemplateIvy from './templates/TemplateIvy.svelte';
  import TemplateHighPerformer from './templates/TemplateHighPerformer.svelte';
  import TemplateMinimal from './templates/TemplateMinimal.svelte';
  import TemplateModern from './templates/TemplateModern.svelte';

  // Default selection
  let selectedTemplate = 'ivy';
</script>

<div class="flex flex-col items-center h-full w-full bg-[#0e0e0e]">
  <div
    class="sticky top-4 z-50 flex gap-2 p-1.5 bg-[#18181b] border border-[#27272a] rounded-full shadow-xl mb-4"
  >
    <button
      class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200
      {selectedTemplate === 'ivy'
        ? 'bg-white text-black shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-white/5'}"
      on:click={() => (selectedTemplate = 'ivy')}
    >
      Ivy League
    </button>

    <button
      class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200
      {selectedTemplate === 'high-performer'
        ? 'bg-white text-black shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-white/5'}"
      on:click={() => (selectedTemplate = 'high-performer')}
    >
      High Performer
    </button>

    <div class="w-px h-6 bg-[#27272a] mx-1 self-center"></div>

    <button
      class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200
      {selectedTemplate === 'minimal'
        ? 'bg-white text-black shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-white/5'}"
      on:click={() => (selectedTemplate = 'minimal')}
    >
      Minimal
    </button>

    <button
      class="px-4 py-2 rounded-full text-xs font-bold transition-all duration-200
      {selectedTemplate === 'modern'
        ? 'bg-white text-black shadow-sm'
        : 'text-gray-400 hover:text-white hover:bg-white/5'}"
      on:click={() => (selectedTemplate = 'modern')}
    >
      Modern
    </button>
  </div>

  <div
    class="flex-1 w-full overflow-y-auto flex justify-center pb-20 custom-scrollbar"
  >
    <div
      class="transform scale-[0.6] origin-top transition-all duration-300 ease-in-out mt-4"
    >
      {#if selectedTemplate === 'ivy'}
        <TemplateIvy />
      {:else if selectedTemplate === 'high-performer'}
        <TemplateHighPerformer />
      {:else if selectedTemplate === 'minimal'}
        <TemplateMinimal />
      {:else if selectedTemplate === 'modern'}
        <TemplateModern />
      {/if}
    </div>
  </div>
</div>

<style>
  /* Custom Scrollbar */
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #27272a;
    border-radius: 20px;
  }
</style>
