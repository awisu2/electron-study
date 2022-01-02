<script>
	import {Counter, Text, Fade, Section} from './components'
	import {beforeUpdate, afterUpdate} from 'svelte'

  let number = 3

  // domの更新があった際に実行: https://svelte.dev/tutorial/update
  //
  // このコンポーネントではnumberが再レンダリングの対象となるので、Counterの値を変化させると実行されます
  // また、numberをコードから削除すると、更新対象がなくなるため関数は実行されません
  beforeUpdate(() => {
    console.log("afterUpdate")
  })
  afterUpdate(() => {
    console.log("afterUpdate")
  })
</script>

<Section>
	<h3>Counter:</h3>
  <div>
    <Counter bind:value={number} on:change={() => {console.log("change counter!")}} />
  </div>
  out of component: {number}
</Section>

<Section>
	<h3>Text:</h3>
	<Text />
</Section>

<Section>
	<h3>Fade:</h3>
  <Fade />
</Section>
