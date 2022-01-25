import { contextBridge } from 'electron'
// @ts-ignore
import svelteApp from './svelte/Root'

// windows.apiにpreload
export class ContextBridgeApi {
  public static readonly API_KEY = 'api'

  // svelte
  render = () => {
    // render()

    // svelteコンポーネントの呼び出し: https://svelte.dev/tutorial/making-an-app
    new svelteApp({
      target: document.body,
      props: {}
    })
  }
}

contextBridge.exposeInMainWorld(ContextBridgeApi.API_KEY, new ContextBridgeApi())
