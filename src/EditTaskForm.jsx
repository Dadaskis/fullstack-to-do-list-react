import React, { useState } from "react";

function EditTaskForm({ onEditTask, taskIndex }) {
    const [task, setTask] = useState({
        title: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        task.title = task.title.trim();
        task.description = task.description.trim();
        
        if (task.title !== "") {
            onEditTask(taskIndex, task);
            setTask({ id: -1, title: "", description: "" });
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <center>
                <h2>Edit task</h2>
            </center>
            <input
                type="text"
                name="title"
                placeholder="Task title"
                value={task.title}
                onChange={handleInputChange}
                required
            />
            <textarea
                name="description"
                rows="6"
                cols="60"
                placeholder="Task description"
                value={task.description}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Add Task</button>
        </form>
    );
}

export default EditTaskForm;
