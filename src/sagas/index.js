import { all } from 'redux-saga/effects'
import { watchFetchTodos, watchCreateTodo, watchDeleteTodo, watchUpdateTodo } from './todoSagas'

export default function* rootSaga() {
    yield all([
        watchFetchTodos(),
        watchCreateTodo(),
        watchUpdateTodo(),
        watchDeleteTodo()
    ])
}