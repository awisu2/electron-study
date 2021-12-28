import { css } from 'styled-components'
import { paddings } from './args'

const spaces = {
  zero: css`
    margin: 0;
    padding: 0;
  `,
  full: css`
    margin: 100%;
    padding: 100%;
  `,
  content: css`
    padding: ${paddings.content};
  `
}

const sizes = {
  full: css`
    width: 100%;
    height: 100%;
  `
}

export { spaces, sizes }
