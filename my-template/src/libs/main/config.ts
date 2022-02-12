/**
 * ユーザが固有設定可能なConfig値をjsonファイルに保管/取得
 *
 * アプリごとに分類するため、userDataディレクトリに保管
 *
 * appDataのisPackagedを利用してファイル名を分けるという手法も可能
 * 思うにメインプロセスに対応させたほうがいいのかもしれない
 */
import fs from 'fs'
import path from 'path'

import { Config, getInitial } from '../share/config'
import { App } from './app'

/** ディレクトリの存在確認をした後ディレクトリの作成 */
function mkdirSyncIfNot(dir: string): void {
  if (fs.existsSync(dir)) return
  fs.mkdirSync(dir, { recursive: true })
}

function getConfigInfo(): { dir: string; file: string } {
  // アプリごとに分類するため、userDataディレクトリに保管
  const dir = App.instance.appData.pathes.userData
  const file = path.join(dir, 'app_config.json')

  return {
    dir,
    file
  }
}

export const readConfig = (): Config => {
  const { file } = getConfigInfo()
  if (!fs.existsSync(file)) {
    return getInitial()
  }
  const data = fs.readFileSync(file, 'utf-8')
  const json: Config = JSON.parse(data)
  // TODO: ファイルが壊されている可能性
  return { ...getInitial(), ...json }
}

export const saveConfig = (config: Config): void => {
  const { dir, file } = getConfigInfo()

  // ディレクトリの補完
  mkdirSyncIfNot(dir)

  // ファイルに保存
  const data = JSON.stringify(config)
  fs.writeFileSync(file, data)
}
