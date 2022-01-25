/**
 * electronのappインスタンスを利用した処理
 */
import { app } from 'electron'
import { AppData, Pathes } from '../consts/ipc'

export const getPathes = (): Pathes => {
  return {
    home: app.getPath('home'),
    userData: app.getPath('userData'),
    current: process.cwd(),
    exe: app.getPath('exe'),
    module: app.getPath('module')
  }
}

export const getAppData = (): AppData => {
  return {
    isPackaged: app.isPackaged,
    pathes: getPathes()
  }
}

export default class App {
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
