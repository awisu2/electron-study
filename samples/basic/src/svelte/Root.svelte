<script>
	import {mainComponent, MainComponent} from './store/nav'

	import Setup from './Setup'
	import { Section } from './components/parts'
	import { Header, Top, Config, Samples } from './components'

	import { derived } from 'svelte/store';
	import { contentPadding } from './styles/args';
	import { appData } from './store/appData'

	// store値を元に可変値を生成: https://svelte.dev/tutorial/derived-stores
	const Mains = {
		[MainComponent.top]: Top,
		[MainComponent.config]: Config,
	}
	const Main = derived(mainComponent, $v => Mains[$v] || Top)

	const styles = {
		main: `
			padding: ${contentPadding.normal};
		`
	}
</script>

<Setup />

<!-- if/else/else if: [Logic / Else\-if blocks • Svelte Tutorial](https://svelte.dev/tutorial/else-if-blocks) -->
{#if $appData}
	<Header></Header>

	<main style={styles.main}>
		<h2>main component</h2>
		<Section>
			<!-- コンポーネントオブジェクトを表示: https://svelte.dev/tutorial/svelte-component -->
			<svelte:component this={$Main} name="script"/>
		</Section>

		<h2>samples of svelte behavior</h2>
		<Samples></Samples>
	</main>
{:else}
	<main style={styles.main}>
		<p>loading...</p>
	</main>
{/if}

<style>
</style>