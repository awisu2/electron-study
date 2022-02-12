/** ipc通信用のパラメータ
 *
 * これに関する処理(生成/取得など)はプロセス専用のライブラリに別途記述
 */
// main processから取得されるアプリ情報
export type AppData = {
  isPackaged: boolean
  pathes: AppDataPathes
}

export type AppDataPathes = {
  home: string
  userData: string
  current: string
  exe: string
  module: string
}
