import React, { useState, useEffect } from 'react';
import './App.css';

// 2. a) Implementando a Lógica com useState e useEffect Gerenciamento de Tarefas:
// Estado de armazenamento da tarefa

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  //2. b) Crie uma função para adicionar uma nova tarefa
  const addTask = () => {
    if (input.trim() === '') return; // Evitar adição de tarefas vazias
    const newTask = { text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };
// 2. c) Marcando uma tarefa como concluída, crie uma função para alternar o estado de conclusão da tarefa
  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };
// 2. d) Crie uma função para remover uma tarefa
  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

// 3. a) Salvando tarefas no armazenamento local
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

// 3. b) Carregando tarefas do armazenamento local
useEffect(() => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    setTasks(savedTasks);
  }
}, []);

//4. a) Renderizando a lista de tarefas
  return (
    <div className="App">
      
      <h1>To-Do List</h1>
      <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="To-Do List Icon" className="todo-icon" width="20px" align="top" display="flex"/>
      {/*Adicione um campo de entrada e um botão para adicionar tarefas: */}
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTask}>Adicionar</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="todo-item">
            <span 
              className={task.completed ? 'completed' : ''}
              onClick={() => toggleComplete(index)}
            >
              {task.text}
            </span>
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;



