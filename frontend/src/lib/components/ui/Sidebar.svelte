<script>
  import { onDestroy } from "svelte";

  // PROPS
  export let side = "left"; // 'left' or 'right'
  export let minWidth = 260;
  export let maxWidth = 500;
  export let initialWidth = 320;

  let width = initialWidth;
  let isResizing = false;
  let sidebarEl;

  function onMouseDown() {
    isResizing = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none"; // Stop text highlighting
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    if (!isResizing) return;
    
    let newWidth;
    const rect = sidebarEl.getBoundingClientRect();

    if (side === "left") {
      // Left Sidebar: Width grows towards the mouse (rightward)
      newWidth = e.clientX - rect.left;
    } else {
      // Right Sidebar: Width grows towards the mouse (leftward)
      // Math: Right Edge - Mouse X
      newWidth = rect.right - e.clientX;
    }
    
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      width = newWidth;
    }
  }

  function onMouseUp() {
    isResizing = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  onDestroy(() => {
    if (typeof window !== "undefined") {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
  });
</script>

<aside
  bind:this={sidebarEl}
  class="flex flex-col relative h-full shrink-0 group transition-colors"
  class:border-r={side === 'left'}
  class:border-l={side === 'right'}
  style="width: {width}px; background-color: #0e0e0e; border-color: #27272a;"
>
  
  <div class="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide text-gray-300">
    <slot name="sidebar" />
  </div>

  <div
    class="absolute top-0 h-full w-1 cursor-col-resize z-50 transition-colors"
    class:right-0={side === 'left'}
    class:left-0={side === 'right'}
    class:bg-amber-500={isResizing}
    class:hover:bg-amber-500={!isResizing}
    on:mousedown={onMouseDown}
  ></div>

</aside>

<style>
    /* Hide scrollbar for a cleaner UI */
    .scrollbar-hide::-webkit-scrollbar {
        display: none;
    }
    .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>