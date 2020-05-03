import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './enhancers/monitorReducer'

import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas';

import { createLogger } from 'redux-logger'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"

import storage from "redux-persist/lib/storage"

const logger = createLogger({});

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: 'todos',
    storage: storage
};

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: persistReducer(persistConfig, rootReducer),
        middleware: [logger, ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }), sagaMiddleware],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    sagaMiddleware.run(rootSaga);

    let persistor = persistStore(store);

    return { store, persistor }
}