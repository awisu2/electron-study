import { app, ipcMain } from 'electron'
import { GETPAHTES_CHANNEL_ID, appData } from './consts/ipc'

export const getPathHandler = (): void => {
  ipcMain.handle(GETPAHTES_CHANNEL_ID, (): appData => {
    return {
      isPackaged: app.isPackaged,
      pathes: {
        home: app.getPath('home'),
        userData: app.getPath('userData'),
        current: process.cwd(),
        exe: app.getPath('exe'),
        module: app.getPath('module')
      }
    }
  })
}
