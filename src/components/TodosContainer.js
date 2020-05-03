import React from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import TodoContainer from './TodoContainer';
import { FETCH_TODOS } from '../types/todoTypes';

function TodosContainer({ todoData, fetchTodos }) {
    useEffect(() => {
        fetchTodos()
    }, [fetchTodos])
    return todoData.loading ? (
        <h2>Loading</h2>
    ) : todoData.error ? (
        <h2>{todoData.error}</h2>
    ) : (
                <div className="container">
                    <div className="main">
                        <ul className="list-group">
                            {todoData &&
                                todoData.todos &&
                                todoData.todos.map(
                                    (todo, index) => <TodoContainer key={index} todo={todo} />)
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
        fetchTodos: () => dispatch({ type: FETCH_TODOS })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosContainer)