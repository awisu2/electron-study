window.addEventListener('DOMContentLoaded', () => {
  // #hello ボタンに preloadスクリプトの関数をセット
  const element = document.getElementById('hello')
  element.onclick = () => window.preload.hello()
})
