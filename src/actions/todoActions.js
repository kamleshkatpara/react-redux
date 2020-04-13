import { FETCH_TODOS_FAILURE, FETCH_TODOS_SUCCESS, FETCH_TODOS_REQUEST, ADD_TODO, DELETE_TODO, EDIT_TODO } from "../types/todoTypes"

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

export const AddTodo = (title) => {
    return (dispatch) => {
        fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
            .then(res => res.json())
            .then(response => {
                const todo = response
                dispatch(addTodoSuccess(todo))
            },
                (error) => {
                    console.warn(error);
                })
    }
}

export const addTodoSuccess = (todo) => {
    return {
        type: ADD_TODO,
        payload: todo
    }
}

export const DeleteTodo = (id) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                const todo = response;

                dispatch(deleteTodoSuccess(id))
            },
                (error) => {
                    console.warn(error);
                })
    }
}

export const deleteTodoSuccess = (id) => {
    return {
        type: DELETE_TODO,
        payload: id
    }
}

export const EditTodo = (id, title) => {
    return (dispatch) => {
        fetch(`http://localhost:3001/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: title })
        })
            .then(res => res.json())
            .then(response => {
                const todo = response
                dispatch(editTodoSuccess({ id, title }))
            },
                (error) => {
                    console.warn(error);
                })
    }
}

export const editTodoSuccess = (todo) => {
    return {
        type: EDIT_TODO,
        payload: todo
    }
}