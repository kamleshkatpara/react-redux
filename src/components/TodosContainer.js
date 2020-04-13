import React from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTodos } from "../actions/todoActions";
import TodoContainer from './TodoContainer';

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
        fetchTodos: () => dispatch(fetchTodos())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodosContainer)