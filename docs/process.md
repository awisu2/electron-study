# プロセスモデル

細かい部分は公式のドキュメントを。([プロセスモデル | Electron](https://www.electronjs.org/ja/docs/latest/tutorial/process-model)
)

1. electron は各アプリを**メインプロセス**で動作する。
2. **レンダラープロセス**：メインプロセスは見た目部分(window)を表示(`mainWindow.loadURL(path)`)する際にレンダラープロセスを作成し実行させる。複数立ち上がることもある。それぞれメインプロセスの子として独立して存在
3. _レンダラープロセスの危険性_：表示部分は chromium ブラウザのため、セキュリティ状況は通常のブラウザ閲覧と同様。更に node で実行されているためローカル環境(ファイルやデバイス)へのアクセスでき、ブラウザよりも大きな危険性が存在する。
4. _レンダラープロセスの制限_：上記危険性の対応のため、レンダラープロセスでは、nodeapi のアクセスが制限されている。(「ウェブ標準」とのこと。具体例でいうと fs や path など)
5. **プリロードスクリプト**：レンダラープロセスの制限を回避する node api へのアクセスが可能な環境。自信で作成したスクリプトのみを事前に読み込むという形で、外部環境からの予期せぬスクリプトの実行を防止している。レンダラープロセスが実行される前に実行される。所属はレンダラープロセス

**プロセス間通信**

プロセスは独立して存在するため、ipc という疎通手段が提供されている

- メインプロセスは：[ipcMain | Electron](https://www.electronjs.org/ja/docs/latest/api/ipc-main)を利用しレンダラープロセスと疎通する
- レンダラープロセスは: [ipcRenderer | Electron](https://www.electronjs.org/ja/docs/latest/api/ipc-renderer)を利用しメインプロセスと疎通する

**ポイント**

- プリロードスクリプトの所属は、レンダラープロセス
  - メインプロセスの app 情報などを直接取得できない。そのため ipc によって情報を返答して貰う必要がある。
- プロセス間でのやり取りは ipc によって行う

## links

- [プロセスモデル | Electron](https://www.electronjs.org/ja/docs/latest/tutorial/process-model)
