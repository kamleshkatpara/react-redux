import React, { useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { AddTodo } from '../actions/todoActions';

const AddTodoContainer = ({ AddTodo }) => {

    const [title, setTitle] = useState('');

    // const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        AddTodo(title)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row align-items-center mb-2 mt-2">
                <div className="col-10">
                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Add New Todo" required />
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
        AddTodo: (title) => dispatch(AddTodo(title))
    }
}

export default connect(
    null,
    mapDispatchToProps
)(AddTodoContainer);