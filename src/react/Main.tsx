import { useEffect, useState } from 'react'
import { useAppSelector } from './store/hooks'
import { selectDisplayMain } from './store/reducers/display'
import { getAppData } from '../libs/ipc'
import Sub from './Sub'
import Top from './Top'
import Config from './Config'
import AppData from '../libs/AppData'

export default (): JSX.Element => {
  const [loadedAppdate, setloadedAppdate] = useState(false)
  const main = useAppSelector(selectDisplayMain)

  // 初期処理として、appDataを取得
  useEffect(() => {
    getAppData().then((appData) => {
      AppData.data = appData
      setloadedAppdate(true)
    })
  }, [])

  const MainComponent = (): JSX.Element => {
    switch (main) {
      case 'config':
        return <Config />
      default:
        return (
          <div>
            <Top />
            <Config />
          </div>
        )
    }
  }

  return (
    <div>
      {loadedAppdate && (
        <div>
          <h2>sub</h2>
          <Sub />
          <h2>main</h2>
          <MainComponent />
        </div>
      )}
    </div>
  )
}
