/**
 * global store
 *
 * [Stores / Writable stores • Svelte Tutorial](https://svelte.dev/tutorial/writable-stores)
 *
 * 記述が多いように見えるがtypescript用の記載が多いだけで、svelteだけであれば1行
 * export const mainComponent = writable<MainComponent>(MainComponent.top)
 */
import { writable } from 'svelte/store'

export const MainComponent = {
  top: 'top',
  config: 'config'
} as const
export type MainComponent = typeof MainComponent[keyof typeof MainComponent]

export const mainComponent = writable<MainComponent>(MainComponent.top)
