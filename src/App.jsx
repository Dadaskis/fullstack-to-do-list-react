import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the PHP API
    fetch('https://localhost/fullstack-to-do-list/tasks.php')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <ul>
        {
          tasks.map(
            task => (
              <li key={task.id}>{task.title} - {task.description}</li>
            )
          )
        }
      </ul>
    </div>
  );
}

export default App;