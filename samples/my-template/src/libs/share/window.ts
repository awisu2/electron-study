/**
 * 表示サイズ
 */
export type DisplaySize = {
  height: number
  width: number
}

export const displaySizes: { [key: string]: DisplaySize } = {
  hd: {
    height: 720,
    width: 1280
  },
  fullHd: {
    height: 1080,
    width: 1920
  },
  k2: {
    height: 1440,
    width: 2560
  },
  k4: {
    height: 2160,
    width: 3840
  },
  k8: {
    height: 4320,
    width: 7680
  }
}
