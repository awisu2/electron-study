<script>
  /**
   * svelte用の初期処理を行うだけのコンポーネント
  */

  import { onMount } from 'svelte'

	import { getAppData } from './../libs/ipc'
	import { appData } from './store/appData'


  // 初回dom表示が終わってから実行: https://svelte.dev/tutorial/onmount
  onMount(async () => {
    // electron の main process　から値取得
    $appData = await getAppData()
  })
</script>