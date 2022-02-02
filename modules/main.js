const { app, BrowserWindow, Menu } = require('electron')
const { join } = require('path')
const isProd = process.env.NODE_ENV == 'production'

// hot reload設定
// require をした時点で有効化される。production 環境時は避けるようにする
if (!isProd) {
  require('electron-reload')(__dirname)
}

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

  // menuの設定
  const menu = Menu.buildFromTemplate([])
  Menu.setApplicationMenu(menu)
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
