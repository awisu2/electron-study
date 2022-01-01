<script>
  import {appData} from './store/appData'
</script>

<h2>config</h2>

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
