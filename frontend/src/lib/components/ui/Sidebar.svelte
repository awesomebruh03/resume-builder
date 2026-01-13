<script>
  import { onDestroy } from "svelte";

  export let minWidth = 180;
  export let maxWidth = 420;
  export let initialWidth = 260;

  let width = initialWidth;
  let isResizing = false;
  let sidebarEl;

  function onMouseDown() {
    isResizing = true;
    document.body.style.cursor = "col-resize";
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    if (!isResizing) return;

    const newWidth = e.clientX - sidebarEl.getBoundingClientRect().left;
    if (newWidth >= minWidth && newWidth <= maxWidth) width = newWidth;
  }

  function onMouseUp() {
    isResizing = false;
    document.body.style.cursor = "default";
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  }

  onDestroy(() => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  });
</script>

<div class="flex h-screen w-full overflow-y-scroll">
  <!-- Sidebar -->
  <aside
    bind:this={sidebarEl}
    class="bg-base-200 flex flex-col relative"
    style="width: {width}px"
  >
    <slot name="sidebar" />

    <!-- Resizer -->
    <div
      class="absolute top-0 right-0 h-full w-2 cursor-col-resize hover:bg-gray-400/20"
      on:mousedown={onMouseDown}
    />
  </aside>

  <!-- Main content -->
  <main class="flex-1 overflow-auto p-4">
    <slot />
  </main>
</div>
