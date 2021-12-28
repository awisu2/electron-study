import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Main from './Main'

export default function render(): void {
  ReactDOM.render(
    <Provider store={store}>
      <Main />
    </Provider>,
    document.getElementById('app')
  )
}
