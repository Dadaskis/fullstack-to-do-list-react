import React, { useEffect, useState } from "react";
import Server from "./Server";
import Utilities from "./Utilities";
import Modal from "./Modal";
import AddTaskForm from "./AddTaskForm";
import "./TaskManager.css";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [server] = useState(new Server());
    const [cantConnect, setCantConnect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (task) => {
        server.postJSON("/api/tasks.php", task, () => {
            task.id = tasks.length;
            setTasks([...tasks, task]);
            setIsModalOpen(false);
        });
    };

    // Fetch tasks from the PHP API
    useEffect(() => {
        server
            .getJSON("/api/tasks.php", (data) => {
                Utilities.printDataDebug("Tasks data acquired", data);
                setTasks(data);
            })
            .catch((error) => {
                setCantConnect(true); // Set the error state if the request fails
            });
    }, [server]);

    if (cantConnect === true) {
        return (
            <>
                <h1>Task Manager is temporarily unavailable</h1>
            </>
        );
    }

    try {
        return (
            <div className="task-manager-body">
                <div className="task-manager-label-body">
                    <h1 className="task-manager-label">Task Manager</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="task-manager-add"
                    >
                        Add Task
                    </button>
                </div>
                {/* Form to add a new task */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <AddTaskForm onAddTask={handleAddTask} />
                </Modal>

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
    } catch (ex) {
        console.error(ex);
        return JSON.stringify(tasks);
    }
}

export default TaskManager;
