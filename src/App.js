import React from 'react';
import './App.css';
import TodosContainer from './components/TodosContainer';
import AddTodoContainer from './components/AddTodoContainer';

function App() {
  return (
    <div className="container">
      <div className="alert alert-info text-center" role="alert">Todos App</div>
      <AddTodoContainer />
      <TodosContainer />
    </div>
  );
}

export default App;
