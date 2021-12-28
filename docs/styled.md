# styled

styled-components を利用するとコンポーネントとして style 付きコンポーネントを生成することが可能

## メリット

- それぞれのコンポーネントで記述するので css 迷子になりづらい
  - 通常の css + class 式だと、一致する名称をファイル間で発見する必要がある
    - css の記述ルールなどは発展してきてはいるが、実際のところ html と css 間で明確な結合は無いため

## usage

```bash
yarn add styled-components
yarn add --dev @types/styled-components
```

_index.tsx_

`` styled.div`any style` `` というのが基本的な使用方法、div の部分は何らかの html タグ。返却は styledComponent で react の component とほぼ同じ用に利用可能。

```tsx
import styled, { css } from 'styled-components'
import { css } from 'styled-components'
import { paddings } from './styles/args'

export default (): JSX.Element => {
  const Wrapper = styled.div`
    ${spaces.content}
    ${sizes.full}
    background-color: yellow;
  `
  return <Wrapper>hello world</Wrapper>
}
```

_styles/args.ts_

css 関数を利用することでプロパティを事前に宣言することが可能

```ts
import { css } from 'styled-components'

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
```
