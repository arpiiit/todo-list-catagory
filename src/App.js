import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('Uncategorized');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        {
          task: newTask,
          category: category,
        },
      ]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const editTask = (index, editedTask) => {
    const newTasks = [...tasks];
    newTasks[index].task = editedTask;
    setTasks(newTasks);
  };

  const addMultipleItems = (index, items) => {
    const newTasks = [...tasks];
    newTasks[index].task += `\n${items}`;
    setTasks(newTasks);
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter Task"
        />
        <select onChange={handleCategoryChange}>
          <option value="Uncategorized">Uncategorized</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-blocks">
        {['Uncategorized', 'Work', 'Personal', 'Shopping'].map((cat) => (
          <div key={cat} className="category-block">
            <h2>{cat}</h2>
            {tasks.map((task, index) => {
              if (task.category === cat) {
                return (
                  <div key={index} className={`task ${index % 2 === 0 ? 'even' : 'odd'}`}>
                    <span>{index + 1}. {task.task}</span>
                    <button onClick={() => deleteTask(index)}>Delete</button>
                    <button onClick={() => editTask(index, prompt('Edit Task', task.task))}>Edit</button>
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
