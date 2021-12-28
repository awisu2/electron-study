import styled from 'styled-components'
import { sizes } from './csses'
import { paddings } from './args'

const FullDiv = styled.div`
  ${sizes.full}
`
const IndentUl = styled.ul`
  padding-left: ${paddings.ulIndent};
`

export { FullDiv, IndentUl }
