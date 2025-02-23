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
