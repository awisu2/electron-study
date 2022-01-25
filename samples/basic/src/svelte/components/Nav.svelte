<script>
  import {mainComponent, MainComponent} from '../store/nav'
  import {InlineLi} from './parts'
  import {clickable} from '../styles/csses'
  import {textColors} from '../styles/args'
  

  function setMainComponent(component) {
    // store.set/update: [Stores / Writable stores • Svelte Tutorial](https://svelte.dev/tutorial/writable-stores)
    // store can directo set: [Stores / Store bindings • Svelte Tutorial](https://svelte.dev/tutorial/store-bindings)
    $mainComponent = component
    // same: mainComponent.set(component)
  }

  const styles = {
    ul: `display: inline;`,
    span: `${clickable} color: ${textColors.onHilight};`
  }
</script>

<ul style={styles.ul}>
  <!-- each: [Logic / Each blocks • Svelte Tutorial](https://svelte.dev/tutorial/each-blocks) --> 
  {#each Object.values(MainComponent) as component}
  <!-- on:click: [Reactivity / Assignments • Svelte Tutorial](https://svelte.dev/tutorial/reactive-assignments) -->
  <InlineLi>
    <span on:click={() => setMainComponent(component)} style={styles.span}>
      {component}
    </span>
  </InlineLi>
{/each}

</ul>
