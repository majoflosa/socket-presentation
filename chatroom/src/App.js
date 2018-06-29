import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import {HashRouter} from 'react-router-dom';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
