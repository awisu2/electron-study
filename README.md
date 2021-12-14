# electron-study

electronの動作実装サンプルです
基本は electron-forge + webpack + typescript + react で構成

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

### tsxを処理できるようにする

* tsconfig.json

```json
{
  "compilerOptions": {
    ...
    "jsx": "react-jsx"
  },
  ...
}
```

### preloadを有効にする

* src/index.ts

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

* package.json

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

* src/preload.ts

```ts
import {contextBridge} from "electron"

// windows.apiにpreload
export class ContextBridgeApi {
    public static readonly API_KEY = "api"

    render = () => {
        console.log("preload!")
    }
}

contextBridge.exposeInMainWorld(ContextBridgeApi.API_KEY, new ContextBridgeApi())
```

* src/renderer.ts

上記preload.tsの呼び出し

```ts
// @ts-ignore
const api: ContextBridgeApi = window.api;
api.render()
```


### reactでレンダリング

* src/react/render.tsx

```tsx
import * as ReactDOM from 'react-dom';

export default function render() {
    ReactDOM.render(<h2>Hello from React!</h2>, document.getElementById("app"));
}
```

* src/preload.ts

renderから、上記react用関数を呼び出し

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

* src/index.html

react用にid設定

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
