import React, { useState } from "react";

function EditTaskForm({ onEditTask, taskIndex, tasks }) {
    const [task, setTask] = useState({
        title: "",
        originalTitle: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        task.title = task.title.trim();
        task.description = task.description.trim();

        if (task.title !== "") {
            onEditTask(taskIndex, task);
            setTask({ title: "", originalTitle: "", description: "" });
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    if (taskIndex != -1) {
        if (task.originalTitle == "") {
            task.title = tasks[taskIndex].title;
            task.originalTitle = tasks[taskIndex].title;
            task.description = tasks[taskIndex].description;
        }
    }

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
                rows="12"
                cols="60"
                placeholder="Task description"
                value={task.description}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Edit Task</button>
        </form>
    );
}

export default EditTaskForm;
