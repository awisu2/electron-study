import { ipcMain } from 'electron'
import { App } from './app'
import {
  GET_APPDATA_CHANNEL,
  SAVE_CONFIG_CHANNEL,
  READ_CONFIG_CHANNEL
} from '../share/ipc'
import { AppData } from '../share/app'
import { Config } from '../share/config'
import { readConfig, saveConfig } from './config'

/**
 * electronのappインスタンスで取得可能な情報の返却
 *
 * ipc により renderer proccess の invodeに返答
 */
export const getAppdataHandler = (): void => {
  // ipcMain.handle: https://www.electronjs.org/ja/docs/latest/api/ipc-main#ipcmainhandlechannel-listener
  ipcMain.handle(GET_APPDATA_CHANNEL, (): AppData => {
    return App.instance.appData
  })
}

export const configHandlers = (): void => {
  ipcMain.handle(READ_CONFIG_CHANNEL, (): Config => {
    return readConfig()
  })

  ipcMain.handle(SAVE_CONFIG_CHANNEL, (_, config: Config): void => {
    saveConfig(config)
  })
}
