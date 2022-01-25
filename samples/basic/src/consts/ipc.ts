/** ipc通信用のパラメータ
 *
 * これに関する処理(生成/取得など)はプロセス専用のライブラリに別途記述
 */
export const GET_APPDATA_CHANNEL = 'getAppdata'
export const READ_CONFIG_CHANNEL = 'readConfig'
export const SAVE_CONFIG_CHANNEL = 'saveConfig'

export type Pathes = {
  home: string
  userData: string
  current: string
  exe: string
  module: string
}

// main processから取得されるアプリ情報
export type AppData = {
  isPackaged: boolean
  pathes: Pathes
}

// ユーザが更新可能なコンフィグ値
export type Config = {
  title: string
}
