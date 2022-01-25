import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import Root from './Root'

export default function render(): void {
  ReactDOM.render(
    <Provider store={store}>
      <Root></Root>
    </Provider>,
    document.getElementById('app')
  )
}
