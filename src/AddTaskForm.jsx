import React, { useState } from "react";

function AddTaskForm({ onAddTask }) {
    const [newTask, setNewTask] = useState({
        id: -1,
        title: "",
        description: "",
        creationDate: Date.now().toString(),
        isComplete: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        newTask.title = newTask.title.trim();
        newTask.description = newTask.description.trim();
        const date = new Date();
        const isoString = date.toISOString();
        const formattedDate = isoString
            .replace("T", " ") // Replace "T" with a space
            .split(".")[0]; // Remove the milliseconds
        newTask.creationDate = formattedDate;
        if (newTask.title !== "") {
            console.log(onAddTask);
            onAddTask(newTask);
            setNewTask({ id: -1, title: "", description: "" });
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value });
    };

    /*
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
    };*/

    return (
        <form onSubmit={handleSubmit}>
            <center>
                <h2>Add a new task</h2>
            </center>
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
    );
}

export default AddTaskForm;
