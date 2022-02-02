const { contextBridge } = require('electron')

// 特定のエレメントにバージョンをセットする
//
// 対象element: #chrome-version #node-version, #electron-version
//
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

// レンダラープロセスから、windows.preloadで呼び出せる値を登録
contextBridge.exposeInMainWorld('preload', {
  hello: () => alert('hello preload!')
})
