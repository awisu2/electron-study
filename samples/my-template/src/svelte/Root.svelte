<script lang="ts">
  let i = 0
</script>

<h1>hello svelte</h1>

<div>
  {i}: <button on:click="{() => i+= 1}">+</button>
</div>