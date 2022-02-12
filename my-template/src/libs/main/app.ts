/**
 * electronのappインスタンスを利用した処理
 */
import { app } from 'electron'
import { AppData, AppDataPathes } from '../share/app'

// パス情報の収集
export const getPathes = (): AppDataPathes => {
  return {
    home: app.getPath('home'),
    userData: app.getPath('userData'),
    current: process.cwd(),
    exe: app.getPath('exe'),
    module: app.getPath('module')
  }
}

// アプリ用データの収集
export const getAppData = (): AppData => {
  return {
    isPackaged: app.isPackaged,
    pathes: getPathes()
  }
}

// appインスタンスを利用したデータ処理クラス
export class App {
  private static _instance: App

  static get instance(): App {
    if (!this._instance) {
      this._instance = new App()
    }
    return this._instance
  }

  appData: AppData

  private constructor() {
    this.appData = getAppData()
  }
}
