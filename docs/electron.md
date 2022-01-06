# electron もろもろ

electron の設定周りについて

- コマンド: electron-forge を導入した際に利用できるコマンド(後述)
- アイコンを変更する: package.json の "config.forge.packagerConfig" へ "icon" を追加する
  - 例： `"icon": "./assets/app.ico"`
  - 注意事項: (検証不足の可能性あり) windows の場合、ファイル形式は ico でないと反映されず、またファイル名を app.ico にしないとデスクトップアイコンに反映されなかった
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
