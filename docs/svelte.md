# svelte

[Svelte • Cybernetically enhanced web apps](https://svelte.dev/)

javascript の UI フレームワーク。react, vue との対比を自身でも生地にしている通りほぼ html の非常に簡潔に記述することが可能。

私の svelte 勉強リポジトリ: [awisu2/svelte\-study: study svelte \(node ui framework\) usage](https://github.com/awisu2/svelte-study)

いいところ

- 記述が簡潔: いろいろな仕組みを利用していく上でいくらか特殊な記述が必要になりますが、ほぼほぼ html の記述を重ねていくだけで構成できます
- global store が楽: サンプルを描くと `export const count = writable(0);` この 1 行で redux の store 相当のことが可能です。
  - [Stores / Writable stores • Svelte Tutorial](https://svelte.dev/tutorial/writable-stores)
  - 細かいことを言い出すと色々ありますが、redux の学習/実装/メンテコストを考えたらどれだけ楽かがわかるのではないでしょうか？

## svelte を実装する

electron-forge でなるべく簡易にするため、svelte-loader を利用して実装しています

[sveltejs/svelte\-loader: Webpack loader for svelte components\.](https://github.com/sveltejs/svelte-loader)

```bash
npm install --save svelte svelte-loader
# or
yarn add svelte svelte-loader
```

_webpack.renderer.config.js_

対象拡張子追加と、svelte の 2 重ロード防止

```js
...
const path = require('path')
...

module.exports = {
  ...
  resolve: {
    extensions: ['.mjs', '.js', '.svelte', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    mainFields: ['svelte', 'browser', 'module', 'main']
  }
}
...
```

_webpack.rules.js_

svelte-loader の設定。公式 github では、`test: /\.(html|svelte)$/,` となっていますが、electron の起動ページの html も対象となってしまうため削除しています。(必要になったら細かく指定することにします)

```js
module.exports = [
  ...,
  {
    test: /\.(svelte)$/,
    use: 'svelte-loader'
  },
  {
    test: /node_modules\/svelte\/.*\.mjs$/,
    resolve: {
      fullySpecified: false
    }
  }
]
```

_src/svelte/Root.svelte_

```html
<script>
  export let name
</script>

<main>
  <h1>Hello {name}?</h1>
</main>

<style>
  h1 {
    color: #ff3e00;
  }
</style>
```

_src/preload.ts_

```ts
import { contextBridge } from 'electron'
// @ts-ignore
import svelteApp from './svelte/Root'

export class ContextBridgeApi {
  public static readonly API_KEY = 'api'

  // svelte
  render = () => {
    // reactRender()
    new svelteApp({
      target: document.getElementById('app'),
      props: {}
    })
  }
}

contextBridge.exposeInMainWorld(ContextBridgeApi.API_KEY, new ContextBridgeApi())
```
