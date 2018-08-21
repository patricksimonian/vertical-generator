import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App/App';
import thunk from 'redux-thunk'; //async action creator helper
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducers/reducer';

import registerServiceWorker from './registerServiceWorker';
// redux debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//creates store with combined reducer and applys redux debugger helper
//and thunk async action creator middleware
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

const root = (
    <Provider store={store}>
        <App />
    </Provider>
  );

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
