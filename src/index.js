import './styles/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';

import { AppContainer } from 'react-hot-loader';

import Root from './root';

import reducers from './reducers';
import createStore from './utils/create-store';
import { load, save } from './utils/storage';
import queryString from 'query-string';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const initalState = load();

const store = createStore(reducers, initalState);
store.subscribe(save(store.getState));

const query = queryString.parse(location.search);

if (query.token) {
  store.dispatch(updateToken(query.token));
}

function Reporter(props) {
  throw props.error;
};

function render(Component) {
  const app = (
    <AppContainer errorReporter={Reporter}>
      <MuiThemeProvider>
        <div>
          <Helmet
            defaultTitle="Applications DB"
            titleTemplate="%s - Applications DB"
          />
          <Component store={store} />
        </div>
      </MuiThemeProvider>
    </AppContainer>
  );

  ReactDOM.render(app, document.getElementById('root'));
}

render(Root);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root');
    render(NewRoot);
  });
}
