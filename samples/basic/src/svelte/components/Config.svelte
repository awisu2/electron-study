<script>
  import {appData} from '../store/appData'
  import {config} from '../store/config'
  import Button from './parts/Button'
  import {saveConfig} from '../../libs/ipc'

  const save = (_config) => {
    $config = _config
    saveConfig(_config)
  }

  // saveするまでは更新させたくないので、別オブジェクトとして切り出し
  let _config = {...$config}
</script>

<h2>config</h2>

<div>
  <form on:submit|preventDefault={save(_config)}>
    <ul>
      <li>title: <input bind:value={_config.title}></li>
    </ul>
    <Button on:click={save(_config)}>save</Button>
  </form>
</div>

<h3>appData</h3>

<ul>
  <li>isPackaged: {$appData.isPackaged}</li>
</ul>

<h3>pathes</h3>

<ul>
  <li>home: {$appData.pathes.home}</li>
  <li>userData: {$appData.pathes.userData}</li>
  <li>exe: {$appData.pathes.exe}</li>
  <li>module: {$appData.pathes.module}</li>
  <li>current: {$appData.pathes.current}</li>
</ul>
