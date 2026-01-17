<script>
  export let title = '';
  // Optional: Allow passing custom classes if needed later
  let clazz = '';
  export { clazz as class };
</script>

<div
  class="relative group w-full max-w-full rounded-xl transition-all duration-300 hover:scale-[1.01] {clazz}"
>
  <div
    class="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 z-[-1]"
    style="background-size: 400% 400%; animation: rgb-shift 15s ease infinite;"
  ></div>

  <div
    class="card-body bg-[#0e0e0f] border border-[#27272a] rounded-xl p-4 text-white h-full relative overflow-hidden"
  >
    <div class="mb-3 min-h-[1.5rem] flex items-center">
      <slot name="title">
        {#if title}
          <h1
            class="font-bold truncate text-sm uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500"
          >
            {title}
          </h1>
        {/if}
      </slot>
    </div>

    <div class="relative z-10">
      <slot></slot>
    </div>
    
    <div class="card-actions justify-end"></div>
  </div>
</div>

<style>
  @keyframes rgb-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
</style>