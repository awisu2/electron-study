import { useEffect, useState } from 'react'
import { useAppSelector } from './store/hooks'
import { selectDisplayMain } from './store/reducers/display'
import { getAppData } from '../libs/ipc'
import Sub from './Sub'
import Top from './Top'
import Config from './Config'
import AppData from '../libs/AppData'
import styled from 'styled-components'
import { sizes, spaces } from './styles/csses'

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

  // reduxで管理しているsteteに合わせて表示するメインコンテンツを変更
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

  const Wrapper = styled.div`
    ${spaces.content}
    ${sizes.full}
  `

  if (loadedAppdate) {
    return (
      <Wrapper>
        <h2>sub</h2>
        <Sub />
        <h2>main</h2>
        <MainComponent />
      </Wrapper>
    )
  } else {
    return <div>loading...</div>
  }
}
