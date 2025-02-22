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

        // Get local date and time components
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        // Format the date and time as "YYYY-MM-DD HH:MM:SS"
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
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
            <textarea
                name="description"
                rows="6"
                cols="60"
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
