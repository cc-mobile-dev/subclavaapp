//  @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { compact } from 'lodash';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import sagas from './sagas';
import Reactotron from '../../../reactotron.config'

// change context types in ReduxWrapper.js
export default function initializeStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = compact([
    thunk.withExtraArgument({}),
    sagaMiddleware,
    // Temporarily disabling it
    // createLogger({

    // })
    // __DEV__ && false ? logger : null, // eslint-disable-line no-constant-condition
  ]);

  let debuggWrapper = data => data;
  // Temporarily disabling it
  // eslint-disable-next-line no-constant-condition
  // if (__DEV__ && false) {
  // debuggWrapper = composeWithDevTools({
  //   realtime: true,
  //   port: 8000,
  //   suppressConnectErrors: false,
  // });
  // }

  const store = createStore(
    rootReducer,
    {},
    compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(sagas);

  return { store, persistor };
}
