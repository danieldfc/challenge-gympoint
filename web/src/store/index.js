import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import createStore from './createStore';
import rootReducer from './modules/rootReducers';
import rootSagas from './modules/rootSagas';
import persistReducers from './persistReducers';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;
const sagamiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagamiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagamiddleware.run(rootSagas);

export { store, persistor };
