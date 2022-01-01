<script>
  /**
   * svelte用の初期処理を行うだけのコンポーネント
  */

	import { getAppData } from './../libs/ipc'
	import { appData } from './store/appData'

  // ipc経由でアプリ情報の収集
  getAppData().then((data) => {
		$appData = data
	})
</script>