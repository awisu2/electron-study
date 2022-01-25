import fs from 'fs'

export const mkdirSyncIfNot = (dir: string): void => {
  if (fs.existsSync(dir)) return
  fs.mkdirSync(dir, { recursive: true })
}
