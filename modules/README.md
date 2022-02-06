# modules

electron 自体の module のまとめ

## お品書き

- menu の設定
- hot reload

## menu の設定

アプリメニューの設定を行える

- main プロセスで以下を実行
  - render プロセスで直接設定をすることはできないため ipcMain で main プロセス に設定を依頼する
- template の type: `(Electron.MenuItemConstructorOptions | Electron.MenuItem)[])`
  - [Class: MenuItem \| Electron](https://www.electronjs.org/ja/docs/latest/api/menu-item)
  - MenuItemConstructorOptions: ドキュメントが無いためソースを直接参照。MenuItem に似ている
  - [サンプル](https://www.electronjs.org/ja/docs/latest/api/menu#%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AB)
- 主要設定
  - [role](https://www.electronjs.org/ja/docs/latest/api/menu-item#%E5%BD%B9%E5%89%B2-roles): メニューアイテムに(os/browser)定義済みの動作を持たせることができます
    - label などが自動設定される
  - click: click 時に実行する関数(ipcRender などで連携させるのが通常か)
    - まずは role で代用できないかを検討するのが、公式おすすめ
  - submenu: サブメニュー(これも配列で、別の Menu インスタンスや、同フォーマットで設定可能)
  - type: normal, separator, submenu, checkbox or radio
  - label: 表示名
- mac は他 OS(linux、windows)とは異なる体系のメニューを持つ
  - [Menu \| Electron](https://www.electronjs.org/ja/docs/latest/api/menu#macos-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%83%A1%E3%83%8B%E3%83%A5%E3%83%BC%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)

### メニュー設定

- メニューを消す: `mainWindow.setMenu(null)`

テンプレートからメニューを設定する

```js
// menuの設定
const template = []
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

## hot reload

[yan\-foto/electron\-reload: Simplest \( \) way to reload an electron app on file changes\!](https://github.com/yan-foto/electron-reload#readme)を利用

[paulmillr/chokidar: Minimal and efficient cross\-platform file watching library](https://github.com/paulmillr/chokidar)を利用しファイルの変更を watch。設定内容に従い、electron のリロードを行っている

_main.js_

```js
const isProd = process.env.NODE_ENV == 'production'

// hot reload設定
// require をした時点で有効化される。production 環境時は避けるようにする
if (!isProd) {
  require('electron-reload')(__dirname)
}
```
