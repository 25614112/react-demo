import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import rootSaga from './sagas'

import Api from './api';
const api = Api.create();
api.getLatestStatus()
.then(data => console.log(data))
.catch(e => console.error(e))

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)

const Root = () => (
  <Counter
      value={store.getState()}
      onFetchUsers={() => action('FETCH_REQUESTED')}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />
)

const action = type => store.dispatch({type})

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, onFetchUsers }) =>(
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
    <hr />
    <button onClick={onFetchUsers}>
      Fetch users
    </button>
  </div>
);

// render the application
function render(){
  ReactDOM.render(<Root />, document.getElementById('root'));
}
render()
store.subscribe(render)
