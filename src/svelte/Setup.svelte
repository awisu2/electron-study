<script>
  /**
   * svelte用の初期処理を行うだけのコンポーネント
  */

	import { getAppData, readConfig } from './../libs/ipc'
	import { appData } from './store/appData'
	import { config } from './store/config'
	import { title } from '../consts/app'

  // 初回dom表示が終わってから実行: https://svelte.dev/tutorial/onmount
  (async () => {
    // electron の main process　から値取得
    $appData = await getAppData()
    $config = await readConfig()
  })()

  $: {
    document.title = $config ? $config.title || title : title
  }
</script>