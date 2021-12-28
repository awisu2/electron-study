const fontSizes = {
  large: '12pt',
  normal: '10pt',
  small: '8pt'
}

const paddings = {
  ulIndent: '20px'
}

const colors = {}

export const ContentPaddding = {
  normal: '3px',
  large: '10px',
  small: '0px'
} as const
export type ContentPaddding = typeof ContentPaddding[keyof typeof ContentPaddding]

export { fontSizes, paddings, colors }
