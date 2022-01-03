import { useAppSelector } from './store/hooks'
import { selectDisplayMain } from './store/reducers/display'
import Sub from './Sub'
import Top from './Top'
import Config from './Config'
import styled from 'styled-components'
import { sizes, spaces } from './styles/csses'

export default (): JSX.Element => {
  const main = useAppSelector(selectDisplayMain)

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

  return (
    <Wrapper>
      <h2>sub</h2>
      <Sub />
      <h2>main</h2>
      <MainComponent />
    </Wrapper>
  )
}
