import { ADD_TODO, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } from '../types/todoTypes';

const initialState = {
    loading: false,
    todos: [],
    error: ''
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_TODOS_SUCCESS:
            return {
                loading: false,
                todos: action.payload,
                error: ''
            }
        case FETCH_TODOS_FAILURE:
            return {
                loading: false,
                todos: [],
                error: action.payload
            }
        case ADD_TODO:
            return state.todos.concat([action.data]);
        default:
            return state;
    }
}
export default todoReducer;