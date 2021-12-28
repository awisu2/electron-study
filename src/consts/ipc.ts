/** ipc通信用のパラメータ
 *
 * これに関する処理(生成/取得など)はプロセス専用のライブラリに別途記述
 */
export const GETPAHTES_CHANNEL_ID = 'getPathes'

export type appData = {
  isPackaged: boolean
  pathes: {
    home: string
    userData: string
    exe: string
    module: string
    current: string
  }
}
