import React, { useEffect, useState } from "react";
import Server from "./server";
import Utilities from "./utilities";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        id: -1,
        title: "",
        description: "",
    });
    const [server] = useState(new Server());
    const [cantConnect, setCantConnect] = useState(false);

    // Fetch tasks from the PHP API
    useEffect(() => {
        server.getJSON("/api/tasks.php", (data) => {
            Utilities.printDataDebug("Tasks data acquired", data);
            setTasks(data);
        })
        .catch((error) => {
            setCantConnect(true); // Set the error state if the request fails
        });
    }, [server]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Send a POST request to add the new task
        server.postJSON("/api/tasks.php", newTask, (data) => {
            data.id = tasks.length;
            // Add the new task to the state
            setTasks([...tasks, data]);
            // Clear the form
            setNewTask({ id: -1, title: "", description: "" });
        });
    };

    if (cantConnect === true) {
        return (
            <>
                <h1>Task Manager is temporarily unavailable</h1>
            </>
        );
    }

    try {
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
                <div>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            {task.title} - {task.description}
                        </li>
                    ))}
                </div>
            </div>
        );
    } catch {
        return JSON.stringify(tasks);
    }
}

export default TaskManager;
