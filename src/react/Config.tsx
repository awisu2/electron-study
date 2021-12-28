import AppData from '../libs/AppData'
import { IndentUl } from './styles/components'

export default (): JSX.Element => {
  return (
    <div>
      <h3>appData</h3>
      <ul>
        <li>isPackaged: {AppData.data.isPackaged ? 'true' : 'false'}</li>
      </ul>

      <h4>appData pathes</h4>
      <IndentUl>
        <li>current: {AppData.data.pathes.current}</li>
        <li>exe: {AppData.data.pathes.exe}</li>
        <li>home: {AppData.data.pathes.home}</li>
        <li>module: {AppData.data.pathes.module}</li>
        <li>userData: {AppData.data.pathes.userData}</li>
      </IndentUl>
    </div>
  )
}
