<script>
  import {Button} from './parts'
  export let value = 0

  // 呼び出し元へのコールバック関数: https://svelte.dev/tutorial/component-bindings
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  const changeDispatch = () => dispatch('change')

  let element

</script>

<!-- inputに値を同期させる: https://svelte.dev/tutorial/text-inputs -->
<!-- attrと変数名が同じ場合は省略可能: https://svelte.dev/tutorial/textarea-inputs -->
<!-- bind:thisで自身を渡す: https://svelte.dev/tutorial/component-this -->
<input type=number bind:value on:change={changeDispatch} bind:this={element} />
<Button on:click={() => value++}>+</Button>
<Button on:click={() => value--}>-</Button>

<Button on:click={() => {element.focus()}}>focus</Button>
