import { renderToString } from 'react-dom/server'
import { applyMiddleware, combineReducers, compose, createStore, Middleware } from 'redux'
import App from './src/App-ssr'
import { config } from 'dotenv'
import { createLogger } from 'vite'
import { Provider } from 'react-redux'
import authReducer from './src/store/reduces/authReducer'

export function render() {
  const {store} = configureStore(
    authReducer,
    {},
  );

  return renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function configureStore(reducers = {}, initialState = {}, ) {

  const middlewares: Middleware[] = [
    // thunkMiddleware,
  ];

  const store = createStore(
    combineReducers(reducers),
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
  store.dispatch({type: '@@redux/INIT'});

  // Можем добавить hot-reload

  return {store};
}
