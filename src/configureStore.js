import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './enhancers/monitorReducer'

import rootReducer from './reducers'

import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas';

import { createLogger } from 'redux-logger'

const logger = createLogger({});

const sagaMiddleware = createSagaMiddleware()

export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [logger, ...getDefaultMiddleware(), sagaMiddleware],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    })

    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
    }

    sagaMiddleware.run(rootSaga);
    return store
}