import { takeLatest, takeEvery, put, call } from 'redux-saga/effects';
import { FETCH_TODOS_REQUEST, FETCH_TODOS_FAILURE, FETCH_TODOS, FETCH_TODOS_SUCCESS, ADD_TODO, CREATE_TODO, DELETE_TODO, REMOVE_TODO, EDIT_TODO, UPDATE_TODO } from '../types/todoTypes';
import { getTodosService, createTodoService, deleteTodoService, updateTodoService } from '../services/todoService';

function* fetchTodos() {
    yield put({ type: FETCH_TODOS_REQUEST });

    try {
        const todos = yield call(getTodosService);
        yield put({ type: FETCH_TODOS_SUCCESS, payload: todos });
    } catch (error) {
        yield put({ type: FETCH_TODOS_FAILURE });
    }
}

export function* watchFetchTodos() {
    yield takeLatest(FETCH_TODOS, fetchTodos)
}


function* createTodo(action) {
    try {
        const newTodo = yield call(createTodoService, action.payload)
        yield put({ type: ADD_TODO, payload: newTodo })
    } catch (error) {
        console.error(error)
    }
}

export function* watchCreateTodo() {
    yield takeEvery(CREATE_TODO, createTodo)
}


function* updateTodo(action) {
    try {
        const updatedTodo = yield call(updateTodoService, action.payload)
        yield put({ type: EDIT_TODO, payload: updatedTodo })
    } catch (error) {
        console.error(error)
    }
}

export function* watchUpdateTodo() {
    yield takeLatest(UPDATE_TODO, updateTodo)
}

function* deleteTodo(action) {
    try {
        yield call(deleteTodoService, action.payload);
        yield put({ type: DELETE_TODO, payload: action.payload })
    } catch (error) {
        console.error(error)
    }
}

export function* watchDeleteTodo() {
    yield takeLatest(REMOVE_TODO, deleteTodo)
}
