import React from 'react';
import ReactDOM from 'react-dom';

import App from './socialnet/App';
import {Provider} from 'react-redux';
import store from './socialnet/store.js';


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
