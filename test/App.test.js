import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import App from '../src/components/App';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';

describe('App', () => {
  it('renders without crashing', () => {
    shallow(
      <Provider store={createStore(reducers)}>
        <App/>
      </Provider>
      );
  });
});



