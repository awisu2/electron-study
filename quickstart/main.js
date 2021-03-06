const { app, BrowserWindow } = require('electron')
const { join } = require('path')

// 見た目部分を作成する関数
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  // index.htmlをセットする
  win.loadFile('index.html')

  // デバッグコンソールの表示
  win.webContents.openDevTools()
}

// 準備ができたら、windowを作成する
app.whenReady().then(() => {
  createWindow()

  // macはアプリが終わったあともバックグラウンドで待機をするため、イベントをセットしておく
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// close時の処理
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
