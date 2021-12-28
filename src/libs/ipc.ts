import { ipcRenderer } from 'electron'
import { GETPAHTES_CHANNEL_ID, appData } from '../consts/ipc'

// AppDataをcallbackしてくれるハンドラを呼び出し
export const getAppData = (): Promise<appData> => {
  return ipcRenderer.invoke(GETPAHTES_CHANNEL_ID)
}
