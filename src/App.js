import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import TodoList from'./components/TodoList';
import './App.css';

function App() {

  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  },[]); 
  
  // State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch(status) {
      case 'completed': 
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted': 
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // Save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }; 

  const getLocalTodos = () => {
    if(localStorage.getItem ("todos") ===null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = localStorage.getItem("todos", JSON.stringify(todos));
      console.log(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Ed's Todo List </h1>
      </header>
      <Form 
        inputText ={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText}
        setStatus = {setStatus} />
      <TodoList 
        setTodos={setTodos} 
        todos={todos}
        filteredTodos = {filteredTodos}/>
    </div>
  );
}

export default App;
