
<script>
	import {mainComponent, MainComponent} from './store/nav'

	import Nav from './Nav'
	import Top from './Top'
	import Config from './Config'
	import { derived } from 'svelte/store';

	// store値を元に可変値を生成: [Stores / Derived stores • Svelte Tutorial](https://svelte.dev/tutorial/derived-stores)
	const Main = derived(
		mainComponent,
		$v => {
			switch($v) {
				case MainComponent.config:
					return Config
				case MainComponent.top:
				default:
					return Top
			}
		}
	)

</script>

<Nav/>

<h1>main contents</h1>

<h2>direct if/else</h2>
<!-- script内でも同様の処理をしているが、一応こういう事もできますよということで -->
<!-- if/else/else if: [Logic / Else\-if blocks • Svelte Tutorial](https://svelte.dev/tutorial/else-if-blocks) -->
{#if $mainComponent == MainComponent.top}
	<Top name="world"></Top>
{:else if $mainComponent == MainComponent.config}
	<Config></Config>
{/if}

<h2>switch(or if, any) in script</h2>
<!-- コンポーネントオブジェクトを表示: [Special elements / <svelte:component> • Svelte Tutorial](https://svelte.dev/tutorial/svelte-component) -->
<svelte:component this={$Main} name="script"/>
