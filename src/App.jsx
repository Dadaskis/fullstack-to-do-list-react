import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ id: -1, title: '', description: '' });

  // Fetch tasks from the PHP API
  useEffect(() => {
    fetch('/api/tasks.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        // Log the raw response text
        return response.text().then(text => {
          let json = null;
          try {
            // Attempt to parse the text as JSON
            json = JSON.parse(text);
          } catch {
            console.error('Invalid JSON from backend:', text);
            json = [];
          }
          return json;
        });
      })
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Send a POST request to add the new task
    fetch('/api/tasks.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    }) 
      .then(response => {
        // Log the raw response text
        return response.text().then(text => {
          let json = null;
          try {
            // Attempt to parse the text as JSON
            json = JSON.parse(text);
          } catch {
            console.error('Invalid JSON from backend:', text);
            json = [];
          }
          return json;
        });
      })
      .then(data => {
        data.id = tasks.length;
        // Add the new task to the state
        setTasks([...tasks, data]);
        // Clear the form
        setNewTask({ id: -1, title: '', description: '' });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  return (
    <div>
      <h1>Task Manager</h1>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Display the list of tasks */}
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title} - {task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;