<script lang="ts">
  import {openDevtool} from '@libs/renderer/handler'
  let i = 0
</script>

<h1>hello svelte</h1>

<div>
  {i}: <button on:click="{() => i+= 1}">+</button>
</div>

<button on:click="{openDevtool}" class="button">open dev tool</button>