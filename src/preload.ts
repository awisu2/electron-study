import { contextBridge } from 'electron'
// import render from './react/render'
// @ts-ignore
import svelteApp from './svelte/Root'

// windows.apiにpreload
export class ContextBridgeApi {
  public static readonly API_KEY = 'api'

  // // react
  // render = () => {
  //   render()
  // }

  // svelte
  render = () => {
    // render()

    // svelteコンポーネントの呼び出し: https://svelte.dev/tutorial/making-an-app
    new svelteApp({
      target: document.getElementById('app'),
      props: {}
    })
  }
}

contextBridge.exposeInMainWorld(ContextBridgeApi.API_KEY, new ContextBridgeApi())
