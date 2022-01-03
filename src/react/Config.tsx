import { useEffect, useState } from 'react'
import { getAppData } from '../libs/ipc'
import { AppData } from '../consts/ipc'
import { IndentUl } from './styles/components'

export default (): JSX.Element => {
  const [appData, setAppData] = useState<AppData>(null)

  useEffect(() => {
    getAppData().then((_appdata) => {
      setAppData(_appdata)
    })
  }, [])

  if (appData) {
    return (
      <div>
        <h3>appData</h3>
        <ul>
          <li>isPackaged: {appData.isPackaged ? 'true' : 'false'}</li>
        </ul>

        <h4>appData pathes</h4>
        <IndentUl>
          <li>current: {appData.pathes.current}</li>
          <li>exe: {appData.pathes.exe}</li>
          <li>home: {appData.pathes.home}</li>
          <li>module: {appData.pathes.module}</li>
          <li>userData: {appData.pathes.userData}</li>
        </IndentUl>
      </div>
    )
  } else {
    ;<div>loading...</div>
  }
}
