import styled from 'styled-components'
import { sizes } from './csses'
import { paddings, ContentPaddding } from './args'

const FullDiv = styled.div`
  ${sizes.full}
`

const IndentUl = styled.ul`
  padding-left: ${paddings.ulIndent};
`

/* ----- ColorSpanProp ----- */
// propertyをstringにしてこの宣言を不要にすることも可能
export const ColorId = {
  none: 'none',
  blue: 'blue',
  red: 'red'
} as const
export type ColorId = typeof ColorId[keyof typeof ColorId]

// typescriptの場合はtype宣言
type ColorSpanProp = {
  // ? を付与して optional にしない場合、defaultPropsを指定していてもプロパティの指定は必須になる
  color?: ColorId
  size?: number
}
const ColorSpan = styled.span<ColorSpanProp>`
  ${(props) => {
    if (!props.color || props.color == ColorId.none) return ''
    // switchや関数を利用してもう少し細かい指定も可能
    return `color: ${props.color};`
  }}
  ${(props) => `font-size: ${props.size}pt`}
`
// デフォルト値を設定
ColorSpan.defaultProps = {
  color: ColorId.none,
  size: 10
}

/** contentDiv
 * 中身のあるコンテンツ用Div
 * 特定のpaddingを付与
 */

type ContentDivProps = {
  padding?: ContentPaddding
}
const ContentDiv = styled.div<ContentDivProps>`
  padding: ${(props) => props.padding};
`
ContentDiv.defaultProps = {
  padding: ContentPaddding.normal
}

export { FullDiv, IndentUl, ColorSpan, ContentDiv }
