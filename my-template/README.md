# basic

ざっくり通常必要になりそうな構成のサンプル

- can use it just copy. but please change name or any setting of package.json.
- this package has the following features
  - electron-forge (webpack + typescript) + svelte + tailwindcss + postcss + electron
  - write config file in userData directory(win: `C:\Users\awisu\AppData\Roaming\{appname}`)
  - reading config file before create window because config file has window size and otehr.
  - can open devtool from render process click event

## プロジェクトを作成し、preload 設定を行う

```bash
APP_NAME=my-new-app
npx create-electron-app "$APP_NAME" --template=typescript-webpack
cd "${APP_NAME}"
```

_tsconfig.json_

モジュールとターゲットの更新、alias の設定

```json
{
  "compilerOptions": {
    ...
    "target": "ES2015",
    "module": "ES2015",
    ...
    "paths": {
      ...
      "@src/*": ["src/*"],
      "@libs/*": ["src/libs/*"]
    }
  },
  ...
}
```

_webpack.renderer.config.js_

webpack にも alias 設定

```js
...
const { join } = require('path')
...
module.exports = {
  ...
  resolve: {
    ...
    alias: {
      ['@src']: join(__dirname, 'src'),
      ['@libs']: join(__dirname, 'src/libs')
    }
  }
}
```

_package.json_

forge の設定に preload を追加

```
{
  ...
  "config": {
    "forge": {
      ...
      "plugins": [
        [
          "@electron-forge/plugin-webpack",
          {
            ...
            "renderer": {
              ...
              "entryPoints": [
                {
                  ...
                  "preload": {
                    "js": "./src/preload.ts"
                  }
                  ...
```

src/index.ts

```ts
...
declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string
...
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  // when is not packeage
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools()
  }
}
...
```

_src/preload.ts_

```ts
import { contextBridge } from 'electron'

const API_KEY = 'preload'

function run() {
  console.log('preload run!')
}

const preload = {
  run
}

contextBridge.exposeInMainWorld(API_KEY, preload)
```

_src/rendrer.ts_

preload を利用できるようにする

```ts
// @ts-ignore
const preload: ContextBridgeApi = window.preload
preload.run()
```

確認

```bash
yarn start
```

## config ファイル、ipc 通信の設定

_src/libs/_ を参照

main/renderer プロセスに別れるため、それぞれのディレクトリでライブラリ管理する
また、両プロセスにまたがって存在するような処理は share ディレクトリで管理

両プロセスにまたがる処理: ipc 用のキー名、受け渡すデータの型

_src/index.ts_

ハンドラを登録。煩雑なら直接書いても OK

```ts
...
import { getAppdataHandler, configHandlers } from './libs/main/handler'
...
getAppdataHandler()
configHandlers()
```

_src/renderer.ts_

```ts
...
import { getAppData } from '@libs/renderer/handler'
...
async function run() {
  ...
  // メインプロセスからappデータの取得
  const appData = await getAppData()
  console.log('appData', appData)
}
...
```

## tailwindcss の導入

- [awisu2/tailwindcss\-study](https://github.com/awisu2/tailwindcss-study)

```bash
yarn add -D tailwindcss postcss-loader postcss postcss-import
yarn add -D autoprefixer mini-css-extract-plugin cssnano

npx tailwindcss init -p
```

_webpack.plugins.js_

```js
...
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  ...
  new MiniCssExtractPlugin({
    filename: 'css/[name]' + '.css', // 出力するファイル名
    chunkFilename: 'css/[id]' + '.css'
  })
]
...
```

_webpack.rules.js_

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [
  ...
  {
    test: /\.(sa|sc|c)ss$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
  }
  ...
]
```

_postcss.config.js_

```js
const isProduction = process.env.NODE_ENV === 'production'

function getPlugins() {
  let plugins = [
    require('postcss-import'), // @import
    require('tailwindcss/nesting'), // tailwindcss での nest記述
    require('tailwindcss'), // tailwind
    require('autoprefixer') // vender prefix(-moz-, -webkit- など)
  ]
  if (isProduction) {
    const prodPlugins = [require('cssnano')] // minify
    plugins = [].concat(plugins, prodPlugins)
  }

  return plugins
}

module.exports = {
  plugins: getPlugins()
}
```

_tailwind.config.js_

tailwind が設定される対象をセット(svelte は別項で追加する、不要であれば削除)

```js
module.exports = {
  content: ['./src/**/*.{html,js,ts,svelte}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

_src/global.scss_

tailwind の基本設定

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

_src/renderer.ts_

tailwind の基本設定読み込み

```ts
import './global.scss'
...
```

## svelte の追加

```bash
yarn add -D svelte svelte-loader

# for typescript
yarn add -D svelte-preprocess svelte-check ts-loader
```

_webpack.renderer.config.js_

省略拡張子の追加

```js
...
module.exports = {
  ...
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.svelte'],
    ...
  }
}
```

_webpack.rules.js_

```js
...
const sveltePreprocess = require('svelte-preprocess')

module.exports = [
  ...{
    test: /\.(svelte)$/,
    use: {
      loader: 'svelte-loader',
      options: {
        preprocess: sveltePreprocess({})
      }
    }
  }
]
```

_src/svelte/Root.svelte_

```html
<script lang="ts">
  let i = 0
</script>

<h1>hello svelte</h1>

<div>{i}: <button on:click="{() => i+= 1}">+</button></div>
```

_src/preload.ts_

```ts
...
// @ts-ignore
import Root from './svelte/Root'
...
async function run() {
  ...
  new Root({
    target: document.body,
    props: {}
  })
}
...
```

alias の追加

_tsconfig.json_

```json
{
  "compilerOptions": {
    ...
    "paths": {
      ...
      "@svelte/*": ["src/svelte/*"],
      "@components/*": ["src/svelte/components/*"],
      "@store/*": ["src/svelte/store/*"]
    }
  },
  ...
}
```

_webpack.renderer.config.js_

```js
...
module.exports = {
  ...
  resolve: {
    ...
    alias: {
      ...
      svelte: resolve('node_modules', 'svelte'),
      ['@svelte']: resolve('src/svelte'),
      ['@components']: resolve('src/svelte/components'),
      ['@store']: resolve('src/svelte/store')
    }
  }
}

```
