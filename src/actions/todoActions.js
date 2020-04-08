import { FETCH_TODOS_FAILURE, FETCH_TODOS_SUCCESS, FETCH_TODOS_REQUEST } from "../types/todoTypes"

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosRequest())
        fetch('http://localhost:3001/todos')
            .then(res => res.json())
            .then(response => {
                const todos = response
                dispatch(fetchTodosSuccess(todos))
            },
                (error) => {
                    console.warn(error);
                    dispatch(fetchTodosFailure(error.message))
                })
    }
}

export const fetchTodosRequest = () => {
    return {
        type: FETCH_TODOS_REQUEST
    }
}

export const fetchTodosSuccess = todos => {
    return {
        type: FETCH_TODOS_SUCCESS,
        payload: todos
    }
}

export const fetchTodosFailure = error => {
    return {
        type: FETCH_TODOS_FAILURE,
        payload: error
    }
}