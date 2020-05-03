import service from './api';

export function getTodosService() {
    return service.get('/todos')
}

export function deleteTodoService(id) {
    return service.delete(`/todos/${id}`)
}

export function createTodoService(payload) {
    return service.post('/todos', payload)
}

export function updateTodoService(payload) {
    const { id, ...rest } = payload

    return service.patch(`/todos/${id}`, rest)
}

export default { getTodosService, deleteTodoService, createTodoService, updateTodoService };
