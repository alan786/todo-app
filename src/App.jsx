import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Tabs } from './component/Tabs'
import { Header } from './component/Header'
import { TodoList } from './component/TodoList'
import { TodoInput } from './component/TodoInput'

function App() {
  const [todos, setTodos] = useState([
    { input: 'Hello! Add your first todo!', complete: true }
  ]);
  const [selectedTab, setSelectedTab] = useState('Open');

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, {input: newTodo, complete: false}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  // NEW: Handle todo updates
  function handleUpdateTodo(index, updatedText) {
    const newTodoList = [...todos];
    newTodoList[index] = {
      ...newTodoList[index],
      input: updatedText
    };
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currentTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currentTodos}))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) {return}
    let db = JSON.parse(localStorage.getItem('todo-app'))
    setTodos(db.todos)
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <TodoList 
        handleDeleteTodo={handleDeleteTodo} 
        handleCompleteTodo={handleCompleteTodo} 
        handleUpdateTodo={handleUpdateTodo}  // Pass update function
        selectedTab={selectedTab} 
        todos={todos} 
      />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  )
}

export default App
