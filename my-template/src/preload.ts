import { contextBridge } from 'electron'
import { getAppData } from '@libs/renderer/handler'
// @ts-ignore
import Root from './svelte/Root'

const API_KEY = 'preload'

async function run() {
  console.log('preload run!')

  // メインプロセスからappデータの取得
  const appData = await getAppData()
  console.log('appData', appData)

  new Root({
    target: document.body,
    props: {}
  })
}

const preload = {
  run
}

contextBridge.exposeInMainWorld(API_KEY, preload)
