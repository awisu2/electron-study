<script>
	import {mainComponent, MainComponent} from './store/nav'

	import Setup from './Setup'
	import Nav from './Nav'
	import Top from './Top'
	import Config from './Config'
	import Samples from './Samples'
	import { Section } from './components'

	import { derived } from 'svelte/store';
	import { sectionMargin } from './styleArgs';
	import { appData } from './store/appData'

	// store値を元に可変値を生成: https://svelte.dev/tutorial/derived-stores
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

<Setup />

{#if $appData}
	<Nav/>

	<h1 style="margin-bottom: {sectionMargin.normal}">main contents</h1>

	<h2>direct if/else</h2>
	<!-- script内でも同様の処理をしているが、一応こういう事もできますよということで -->
	<!-- if/else/else if: [Logic / Else\-if blocks • Svelte Tutorial](https://svelte.dev/tutorial/else-if-blocks) -->
	<Section>
		{#if $mainComponent == MainComponent.top}
			<Top name="world"></Top>
		{:else if $mainComponent == MainComponent.config}
			<Config></Config>
		{/if}
	</Section>

	<h2>switch(or if, any) in script</h2>
	<!-- コンポーネントオブジェクトを表示: [Special elements / <svelte:component> • Svelte Tutorial](https://svelte.dev/tutorial/svelte-component) -->
	<Section>
		<svelte:component this={$Main} name="script"/>
	</Section>

	<h2>samples of svelte behavior</h2>
	<Samples></Samples>
{:else}
  <p>loading...</p>
{/if}

<style>
</style>