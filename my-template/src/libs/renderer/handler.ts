import { ipcRenderer } from 'electron'
import {
  GET_APPDATA_CHANNEL,
  READ_CONFIG_CHANNEL,
  SAVE_CONFIG_CHANNEL,
  OPEN_DEV_TOOL_CHANNEL
} from '../share/ipc'
import { AppData } from '../share/app'
import { Config } from '../share/config'

// AppDataをcallbackしてくれるハンドラを呼び出し
export const getAppData = (): Promise<AppData> => {
  return ipcRenderer.invoke(GET_APPDATA_CHANNEL)
}

// AppDataをcallbackしてくれるハンドラを呼び出し
export const readConfig = (): Promise<Config> => {
  return ipcRenderer.invoke(READ_CONFIG_CHANNEL)
}

export const saveConfig = (config: Config): Promise<void> => {
  return ipcRenderer.invoke(SAVE_CONFIG_CHANNEL, config)
}

export const openDevtool = (): Promise<void> => {
  return ipcRenderer.invoke(OPEN_DEV_TOOL_CHANNEL)
}
