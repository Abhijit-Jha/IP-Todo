import React, { useState, useEffect } from 'react';
import './App.css';
import 'tailwindcss/tailwind.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [reminder, setReminder] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(tasks => [...tasks]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTask = () => {
    if (taskName.length === 0) {
      alert("Please Enter a Task");
    } else {
      const task = {
        id: tasks.length + 1,
        name: taskName,
        reminder: reminder,
        completed: false,
      };

      setTasks([...tasks, task]);
      setTaskName('');
      setReminder('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const calculateTimeLeft = (reminder) => {
    const timeLeft = new Date(reminder) - new Date();
    if (timeLeft <= 0) {
      return "Time's up!";
    }
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto p-5 bg-white shadow-lg rounded-lg max-w-xl">
        <div id="header" className="bg-purple-600 text-white text-2xl font-medium p-3 text-center rounded mb-5">To-Dos</div>
        <div id="newtask" className="flex flex-col md:flex-row justify-between items-center mb-5 bg-white p-4 rounded shadow-md">
          <input 
            type="text" 
            placeholder="Task to be done..." 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full md:w-1/2 h-12 border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-purple-600 mb-3 md:mb-0 md:mr-2"
          />
          <input 
            type="datetime-local" 
            id="reminder" 
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="w-full md:w-1/2 h-12 border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-purple-600 mb-3 md:mb-0 md:mr-2"
          />
          <button 
            id="push" 
            onClick={addTask} 
            className="w-full md:w-auto h-12 bg-purple-600 text-white rounded hover:bg-purple-500 transition px-4"
          >
            Add
          </button>
        </div>
        <div id="tasks" className="bg-white p-4 rounded shadow-md">
          {tasks.filter(task => !task.completed).map(task => (
            <div key={task.id} className="task flex justify-between items-center p-2 border-b-2 border-gray-300 hover:bg-gray-100 transition">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="task-checkbox mr-2" 
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <div className="task-info">
                  <span className="task-name font-medium">{task.name}</span>
                  {task.reminder && (
                    <span className="task-time text-xs text-gray-500 ml-2">
                      Time left: {calculateTimeLeft(task.reminder)}
                    </span>
                  )}
                </div>
              </div>
              <button 
                className="delete bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition"
                onClick={() => deleteTask(task.id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
        <div id="donetasks" className="mt-5 bg-white p-4 rounded shadow-md">
          {tasks.filter(task => task.completed).map(task => (
            <div key={task.id} className="task flex justify-between items-center p-2 border-b-2 border-gray-300 hover:bg-gray-100 transition line-through">
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  className="task-checkbox mr-2" 
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <div className="task-info">
                  <span className="task-name font-medium">{task.name}</span>
                  {task.reminder && (
                    <span className="task-time text-xs text-gray-500 ml-2">
                      Time left: {calculateTimeLeft(task.reminder)}
                    </span>
                  )}
                </div>
              </div>
              <button 
                className="delete bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition"
                onClick={() => deleteTask(task.id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
