import { ipcRenderer } from 'electron'
import {
  GET_APPDATA_CHANNEL,
  READ_CONFIG_CHANNEL,
  SAVE_CONFIG_CHANNEL,
  AppData,
  Config
} from '../consts/ipc'

// AppDataをcallbackしてくれるハンドラを呼び出し
export const getAppData = (): Promise<AppData> => {
  return ipcRenderer.invoke(GET_APPDATA_CHANNEL)
}

// AppDataをcallbackしてくれるハンドラを呼び出し
export const readConfig = (): Promise<Config> => {
  return ipcRenderer.invoke(READ_CONFIG_CHANNEL, { a: 1, b: 2 })
}

export const saveConfig = (config: Config): Promise<void> => {
  return ipcRenderer.invoke(SAVE_CONFIG_CHANNEL, config)
}
