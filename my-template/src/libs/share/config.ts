/**
 * アプリで管理するconfig値
 *
 * アプリ内でのユーザの設定の更新などに対応し、userData内にconfigファイルを作成し管理
 * また、mainプロセスのwindow生成時などにも影響を与えるので、mainプロセス側で処理
 */
import { DisplaySize, displaySizes } from './window'

export const title = 'electron app'
export const configfile = 'appconfig.json'

// ユーザが更新可能なコンフィグ値
export type Config = {
  title: string
  windowSize: DisplaySize
}

export const getInitial = (): Config => {
  return {
    title: '',
    windowSize: {
      height: displaySizes.fullHd.height,
      width: displaySizes.fullHd.width
    }
  }
}
