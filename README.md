# electron-study

[Electron \| JavaScript, HTML, CSS によるクロスプラットフォームなデスクトップアプリ開発](https://www.electronjs.org/)

node.js + chromium による統合 gui 環境

- electron とは?: GUI. Node.js 及び chromium が動作する環境ではほぼほぼ同じように動作する

## ドキュメント

- [quickstart](./quickstart): とりあえずやってみる
- [サンプル](./my-template): electron の実利用サンプル(electron-forge + webpack + typescript + アプリ用の config ファイル管理 + tailwindcss をベースに構成)
- [プロセス](./docs/process.md): メイン/レンダラー(+preload)プロセスについてと、ipc を利用した app 情報の取得
- [svelte](./docs/svelte.md): UI フレームワーク。とても記述が完結で、何よりも store の扱いが非常に楽
  - 最新の main ブランチではこちらで UI を実装している(src/preload.ts でコメントの切り替えで react も動作します)
- react: UI フレームワーク(現在コメントアウトになっていますが、かんたんな redux を利用した処理までは実装しています)
  - [redux](./docs/redux.md): 複数のコンポーネント間で共通のデータを扱う
  - [styled (styled-components)](./docs/styled.md): js の内部に css を展開する ES6 で実装予定とのこと
- [electron もろもろ](./docs/electron.md): 実行コマンド、アイコン設定、アプリ用ローカル画像のコピーなど electron 自体を利用する際のもろもろ
- [modules](./modules): electron 標準の module の動作サンプル。メニュー設定など
- [app](./docs/app.md): app インスタンスを利用した、アプリ情報の取得や操作
- [mainFunctions](./docs/mainFunctions.md): A collection of main process's functions what i think useful.

## 初期構築

一通り実装することで「Hello from React!」と表示されます。

### プロジェクト作成

```bash
# コマンド実行により、electron-forgeのプロジェクトを作成
npx create-electron-app electron-study --template=typescript-webpack
cd electron-study

# react用のモジュールインストール
yarn add react react-dom
yarn add --dev @types/react @types/react-dom
```

### tsx を処理できるようにする

- tsconfig.json

```json
{
  "compilerOptions": {
    ...
    "jsx": "react-jsx"
  },
  ...
}
```

### preload を有効にする

- src/index.ts

```ts
...
declare const MAIN_WINDOW_WEBPACK_ENTRY: string; //レンダラープロセススクリプトのファイルパス
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;
...
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    ...
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      contextIsolation: true,
    },
  });
  ...
}
...
```

- package.json

```json
...
"plugins": [
        [
          "@electron-forge/plugin-webpack",
          {
            "mainConfig": "./webpack.main.config.js",
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

- src/preload.ts

```ts
import { contextBridge } from 'electron'

// windows.apiにpreload
export class ContextBridgeApi {
  public static readonly API_KEY = 'api'

  render = () => {
    console.log('preload!')
  }
}

contextBridge.exposeInMainWorld(ContextBridgeApi.API_KEY, new ContextBridgeApi())
```

- src/renderer.ts

上記 preload.ts の呼び出し

```ts
// @ts-ignore
const api: ContextBridgeApi = window.api
api.render()
```

### svelte/react でレンダリング

### svelte の場合

svelte のパッケージをインストールしたら、このリポジトリの src ディレクトリをコピーするだけでも動作します。(src/react は不要なので削除)

[svelte](./docs/svelte.md)

### react の場合

- src/react/render.tsx

```tsx
import * as ReactDOM from 'react-dom'

export default function render() {
  ReactDOM.render(<h2>Hello from React!</h2>, document.getElementById('app'))
}
```

- src/preload.ts

render から、上記 react 用関数を呼び出し

```ts
...
import render from './react/render'
...
export class ContextBridgeApi {
    ...
    render = () => {
        render()
    }
}
...
```

- src/index.html

react 用に id 設定

```html
<!DOCTYPE html>
<html>
  ...
  <body>
    <div id="app" />
  </body>
</html>
```

### 動作確認

```bash
yarn start
```

## 設定など

- "src/index.ts" によって、windows のサイズやデバッグメニューの表示などの設定を行えます
- コマンド:
