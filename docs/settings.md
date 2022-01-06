# アプリ設定

electron の設定周りについて

- アイコンを変更する: package.json の "config.forge.packagerConfig" へ "icon" を追加する
  - 例： `"icon": "./assets/app.ico"`
  - 注意事項: (検証不足の可能性あり) windows の場合、ファイル形式は ico でないと反映されず、またファイル名を app.ico にしないとデスクトップアイコンに反映されなかった
