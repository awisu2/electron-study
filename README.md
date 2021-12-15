# electron-study

electron の動作実装サンプルです
基本は electron-forge + webpack + typescript + react で構成

## ドキュメント

- 初期構築: このファイルです
- [プロセス](./docs/process.md): メイン/レンダラー(+preload)プロセスについてと、ipc を利用した app 情報の取得

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
import { contextBridge } from "electron";

// windows.apiにpreload
export class ContextBridgeApi {
  public static readonly API_KEY = "api";

  render = () => {
    console.log("preload!");
  };
}

contextBridge.exposeInMainWorld(
  ContextBridgeApi.API_KEY,
  new ContextBridgeApi()
);
```

- src/renderer.ts

上記 preload.ts の呼び出し

```ts
// @ts-ignore
const api: ContextBridgeApi = window.api;
api.render();
```

### react でレンダリング

- src/react/render.tsx

```tsx
import * as ReactDOM from "react-dom";

export default function render() {
  ReactDOM.render(<h2>Hello from React!</h2>, document.getElementById("app"));
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

### コマンド

開発時は `yarn start`, ローカルで利用する際は `yarn make` or `yarn package`, electron app にアップロードする際は `yarn publish`を利用するのが基本

- `yarn start` : 付与されたディレクトリ(デフォルト .)の electron を起動する。
  - 基本的に開発用、デフォルトではホットリロード
- `yarn package`: out ディレクトリに実行形式のパッケージを出力する
  - {app name}-{os}-{arc} というフォルダをコピーして利用できる
- `yarn make`: out ディレクトリに配布可能ファイルを作成
  - `yarn package`の結果に加え、out/make ディレクトリが生成され、squirrel という形式のセットアップファイルが追加される
    - セットアップを実行すると、windows であれば {user directory}\AppData\Local\{app name} に package がインストールされ、デスクトップにショートカットが設置される
- `yarn publish`: https://www.electronjs.org/apps へアップロードする
