import React from 'react';
import { connect } from 'react-redux';
import { CREATE_TODO } from '../types/todoTypes';
import { useInput } from '../lib/useInput';

const AddTodoContainer = ({ AddTodo }) => {

    const { value, bind, reset } = useInput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        AddTodo(value);
        reset();
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row align-items-center mb-2 mt-2">
                <div className="col-10">
                    <input type="text" className="form-control" {...bind} placeholder="Add New Todo" required />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        AddTodo: (title) => dispatch({ type: CREATE_TODO, payload: { title: title } })
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddTodoContainer);