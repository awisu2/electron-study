# electron もろもろ

electron の設定周りについて

- コマンド: electron-forge を導入した際に利用できるコマンド(後述)
- アイコンを変更する: package.json の "config.forge.packagerConfig" へ "icon" を追加する
  - 例： `"icon": "./assets/app.ico"`
  - 注意事項: (検証不足の可能性あり) windows の場合、ファイル形式は ico でないと反映されず、またファイル名を app.ico にしないとデスクトップアイコンに反映されなかった

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
