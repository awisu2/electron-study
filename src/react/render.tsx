import * as ReactDOM from 'react-dom';
import Top  from './Top';
import {Provider} from 'react-redux';
import {store} from './store';

export default function render() {
    ReactDOM.render(<Provider store={store}>
        <Top />
    </Provider>, document.getElementById("app"));
}
