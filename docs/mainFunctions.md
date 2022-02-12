# mainprocess functions

A collection of mainProcess's functions what i found useful.

**LIST**

- get appData
- openDevTools from render process's invoke

## get appData

```ts
import { app } from 'electron'
import { AppData, AppDataPathes } from '../ipc'

export const getPathes = (): AppDataPathes => {
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
```

## openDevTools from render process's invoke

```ts
import { ipcMain, BrowserWindow } from 'electron'
import { OPEN_DEV_TOOL_CHANNEL } from './ipc'

ipcMain.handle(OPEN_DEV_TOOL_CHANNEL, (): void => {
  // INFO: can't get render window directly
  const window = BrowserWindow.getFocusedWindow()
  if (!window) return

  window.webContents.openDevTools()
})
```
