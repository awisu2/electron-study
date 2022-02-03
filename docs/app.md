# app インスタンスで可能なこと

- 特殊ディレクトリの取得
- isPackage: `app.isPackaged`

## 特殊ディレクトリの取得

```node
import { app } from 'electron'

export const getPathes = () => {
  return {
    home: app.getPath('home'),
    userData: app.getPath('userData'),
    current: process.cwd(),
    exe: app.getPath('exe'),
    module: app.getPath('module')
  }
}
```

note: [os\-study/specialDirectory\.md at main · awisu2/os\-study](https://github.com/awisu2/os-study/blob/main/common/specialDirectory.md)
