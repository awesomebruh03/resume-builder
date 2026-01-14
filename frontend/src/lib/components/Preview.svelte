<script>
  import TemplateMinimal from './templates/TemplateMinimal.svelte';
  import TemplateModern from './templates/TemplateModern.svelte';

  // In a real app, this would be stored in the 'resumeStore' too 
  // so the selected template is saved.
  let selectedTemplate = 'minimal'; 
</script>

<div class="flex flex-col items-center gap-4">
  
  <div class="flex gap-2 p-2 bg-gray-800 rounded-lg">
    <button 
      class="px-4 py-2 text-white rounded text-sm {selectedTemplate === 'minimal' ? 'bg-amber-500 font-bold' : 'hover:bg-gray-700'}" 
      on:click={() => selectedTemplate = 'minimal'}
    >
      Minimalist
    </button>
    <button 
      class="px-4 py-2 text-white rounded text-sm {selectedTemplate === 'modern' ? 'bg-amber-500 font-bold' : 'hover:bg-gray-700'}" 
      on:click={() => selectedTemplate = 'modern'}
    >
      Modern
    </button>
  </div>

  <div class="transform scale-[0.6] origin-top border border-gray-700 shadow-2xl">
    {#if selectedTemplate === 'minimal'}
      <TemplateMinimal />
    {:else}
      <TemplateModern />
    {/if}
  </div>

</div>