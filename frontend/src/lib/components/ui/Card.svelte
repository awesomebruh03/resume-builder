<script>
  export let title = '';
</script>

<div
  class="card w-full max-w-full bg-transparent backdrop-blur-sm shadow-sm p-4 transition-all duration-300 hover:shadow-sm hover:scale-102"
>
  <div class="card-body text-white">
    <h1 class="font-bold truncate">{title}</h1>
    <slot></slot>
    <div class="card-actions justify-end"></div>
  </div>
</div>
