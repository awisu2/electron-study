/**
 * ユーザが固有設定可能なConfig値をjsonファイルに保管/取得
 *
 * アプリごとに分類するため、userDataディレクトリに保管
 *
 * note: appDataのisPackagedを利用してファイル名を分けるという手法も可能
 */
import fs from 'fs'
import { AppData } from '../consts/ipc'
import { configfile } from '../consts/app'
import path from 'path'
import { mkdirSyncIfNot } from './utils'

export type Config = {
  title: string
}

const initial: Config = {
  title: ''
}

function getConfigInfo(appData: AppData): { dir: string; file: string } {
  const dir = appData.pathes.userData
  const file = path.join(dir, configfile)
  return {
    dir,
    file
  }
}

export const load = (appData: AppData): Config => {
  const { file } = getConfigInfo(appData)
  if (fs.existsSync(file)) {
    const data = fs.readFileSync(appData.pathes.userData, 'utf-8')
    return JSON.parse(data)
  } else {
    save(initial, appData)
  }
}

export const save = (config: Config, appData: AppData) => {
  const { dir, file } = getConfigInfo(appData)

  mkdirSyncIfNot(dir)

  const data = JSON.stringify(config)
  fs.writeFileSync(file, data)
}
