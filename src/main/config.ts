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

import { Config } from '../consts/ipc'
import { configfile } from '../consts/app'
import { mkdirSyncIfNot } from '../libs/utils'
import App from './App'

const initial: Config = {
  title: ''
}

function getConfigInfo(): { dir: string; file: string } {
  // アプリごとに分類するため、userDataディレクトリに保管
  const dir = App.instance.appData.pathes.userData
  const file = path.join(dir, configfile)

  return {
    dir,
    file
  }
}

export const readConfig = (): Config => {
  const { file } = getConfigInfo()
  if (!fs.existsSync(file)) {
    return initial
  }
  const data = fs.readFileSync(file, 'utf-8')
  return JSON.parse(data)
}

export const saveConfig = (config: Config): void => {
  const { dir, file } = getConfigInfo()

  // ディレクトリの補完
  mkdirSyncIfNot(dir)

  // ファイルに保存
  const data = JSON.stringify(config)
  fs.writeFileSync(file, data)
}
