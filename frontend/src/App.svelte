<script>
  import LeftSidebar from './lib/components/LeftSidebar.svelte';
  import Preview from './lib/components/Preview.svelte';
  import RightSidebar from './lib/components/RightSidebar.svelte';
</script>

<main class="flex flex-row h-screen w-full overflow-hidden bg-gray-900 text-white">
  
  <LeftSidebar />

  <div class="flex-1 h-full overflow-auto relative flex justify-center p-10 bg-[#1a1a1a]">
     <Preview />
  </div>

  <RightSidebar />

</main>