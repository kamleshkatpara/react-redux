import React from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos } from "../actions/todoActions";

function TodosContainer({ todoData, fetchTodos }) {
    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])
    return todoData.loading ? (
        <h2>Loading</h2>
    ) : todoData.error ? (
        <h2>{todoData.error}</h2>
    ) : (
                <div>
                    <h2>Todo List</h2>
                    <div>
                        <ul>
                            {todoData &&
                                todoData.todos &&
                                todoData.todos.map(
                                    (todo, index) => <li key={index}>{todo.title}</li>)
                            }
                        </ul>
                    </div>
                </div>
            )
}

const mapStateToProps = state => {
    return {
        todoData: state.todo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchTodos: () => dispatch(fetchTodos())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosContainer)