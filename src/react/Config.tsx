import AppData from '../libs/AppData'

export default (): JSX.Element => {
  return (
    <div>
      <h3>appData</h3>
      <ul>
        <li>isPackaged: {AppData.data.isPackaged}</li>
      </ul>

      <h4>appData pathes</h4>
      <ul>
        <li>current: {AppData.data.pathes.current}</li>
        <li>exe: {AppData.data.pathes.exe}</li>
        <li>home: {AppData.data.pathes.home}</li>
        <li>module: {AppData.data.pathes.module}</li>
        <li>userData: {AppData.data.pathes.userData}</li>
      </ul>
    </div>
  )
}
