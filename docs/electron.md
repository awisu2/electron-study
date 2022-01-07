# electron もろもろ

electron の設定周りについて

- コマンド: electron-forge を導入した際に利用できるコマンド(後述)
- アイコン設定: package.json の "config.forge.packagerConfig" へ "icon" を追加する
  - 例： `"icon": "./assets/app.ico"`
  - windows では ico 形式の画像を用意しておくこと
  - windows での不可思議な挙動がある(後述)
- アプリ用画像の用意: アプリ用に画像を利用する場合は、copyWebpackPlugin を利用して、ビルド時に一緒に配置されるようにしておく(ビルドや install される際に current ディレクトリが変わるため)
  - [CopyWebpackPlugin \| webpack](https://webpack.js.org/plugins/copy-webpack-plugin/)
  - 利用したい画像が、url や絶対パスなどアプリがどこにあってもアクセス可能な場合は不要
  - 例えば `{ from: "source", to: "dest" },` とした場合, `./dest/yourAsset.any` という感じでアクセスが可能

## コマンド

開発時は `yarn start`, ローカルで利用する際は `yarn make` or `yarn package`, electron app にアップロードする際は `yarn publish`を利用するのが基本

- `yarn start` : 付与されたディレクトリ(デフォルト .)の electron を起動する。
  - 基本的に開発用、デフォルトではホットリロード
- `yarn package`: out ディレクトリに実行形式のパッケージを出力する
  - {app name}-{os}-{arc} というフォルダをコピーして利用できる
- `yarn make`: out ディレクトリに配布可能ファイルを作成
  - `yarn package`の結果に加え、out/make ディレクトリが生成され、squirrel という形式のセットアップファイルが追加される
    - セットアップを実行すると、windows であれば {user directory}\AppData\Local\{app name} に package がインストールされ、デスクトップにショートカットが設置される
- `yarn publish`: https://www.electronjs.org/apps へアップロードする

## アイコン設定: windows での不可思議な挙動

アイコンを更新してもデスクトップアイコンが更新されないという動作がある。

変更されないのは起動時 top 画面のデスクトップアイコン。エクスプローラ内のデスクトップではアイコンが変更されている
一番目に付く場所なので非常に困る。

ランチャーアプリなどに登録した時も更新されていることから、windows の問題と考えられる
windows のアイコンキャシュなるものを削除して(再起動しても)も反映されない

### 対処方法

プロパティ設定のアイコン変更から設定可能(更新したアイコンが選択できる)
ただし、次回の setup.exe 実行時に巻き戻る
