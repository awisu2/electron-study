<script>
  import {mainComponent, MainComponent} from './store/nav'

  function setMainComponent(component) {
    // store.set/update: [Stores / Writable stores • Svelte Tutorial](https://svelte.dev/tutorial/writable-stores)
    // store can directo set: [Stores / Store bindings • Svelte Tutorial](https://svelte.dev/tutorial/store-bindings)
    $mainComponent = component
    // same: mainComponent.set(component)
  }
</script>

navigation: 
<!-- each: [Logic / Each blocks • Svelte Tutorial](https://svelte.dev/tutorial/each-blocks) --> 
{#each Object.values(MainComponent) as component}
  <!-- on:click: [Reactivity / Assignments • Svelte Tutorial](https://svelte.dev/tutorial/reactive-assignments) -->
  <button on:click={() => setMainComponent(component)}>{component}</button>
{/each}
