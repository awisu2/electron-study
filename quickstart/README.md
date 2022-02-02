# quickstart

[クイック スタート \| Electron](https://www.electronjs.org/ja/docs/latest/tutorial/quick-start)

実施していることとポイント

- quickstart に従ったスクリプトの実装
- デバッグコンソールの表示
- レンダラープロセスからプリロードスクリプトの実行
- プリロードスクリプトの読み込み設定は、window 作成時に行われている

## 1. project の作成

```bash
# package.json が作成される
yarn init -p -y
yarn add --dev electron
```

_package.json_

```json
{
  ...
  "main": "main.js",
  "scripts": {
    "start": "electron ."
  },
  ...
}
```

note: ここでの "main" の指定はメインプロセスの起動ファイルの指定になる

## 2. 最初のページを作成する

_index.html_

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>, Chromium
    <span id="chrome-version"></span>, and Electron <span id="electron-version"></span>.
  </body>
</html>
```

_main.js_

```js
const { app, BrowserWindow } = require('electron')

// 見た目部分を作成する関数
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // index.htmlをセットする
  win.loadFile('index.html')

  // デバッグコンソールの表示
  win.webContents.openDevTools()
}

// 準備ができたら、windowを作成する
app.whenReady().then(() => {
  createWindow()

  // macはアプリが終わったあともバックグラウンドで待機をするため、イベントをセットしておく
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// close時の処理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```

起動

```bash
yarn start
```

## 3. preload スクリプトを実行する

_preload.js_

```js
// 特定のエレメントにバージョンをセットす
//
// 対象element: #chrome-version #node-version, #electron-version
//
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

_main.js_

preload.js を呼び出すようにする

```js
...
const { join } = require('path')

// 見た目部分を作成する関数
const createWindow = () => {
  const win = new BrowserWindow({
    ...
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })
  ...
}
...
```

## renderer から呼び出せるオブジェクトのセット

_preload.js_

```js
const { contextBridge } = require('electron')
...
// レンダラープロセスから、windows.preloadで呼び出せる値を登録
contextBridge.exposeInMainWorld('preload', {
  hello: () => alert('hello preload!')
})
```

_index.html_

```html
<!DOCTYPE html>
<html>
  ...
  <body>
    ...
    <!-- preloadで登録された関数を実行 -->
    <button id="hello">hello</button>
    <script src="renderer.js"></script>
  </body>
</html>
```

_renderer.js_

```js
window.addEventListener('DOMContentLoaded', () => {
  // #hello ボタンに preloadスクリプトの関数をセット
  const element = document.getElementById('hello')
  element.onclick = () => window.preload.hello()
})
```

```bash
yarn start
```
