import React, { useEffect, useState } from "react";
import Server from "./Server";
import Utilities from "./Utilities";
import Modal from "./Modal";
import AddTaskForm from "./AddTaskForm";
import TasksList from "./TasksList";
import "./TaskManager.css";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [server] = useState(new Server());
    const [cantConnect, setCantConnect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (task) => {
        task.id = tasks.length + 1;
        setIsModalOpen(false);
        server.postJSON("/api/tasks.php", task, () => {
            setTasks([...tasks, task]);
        });
    };

    const toggleTask = (taskID) => {
        const task = tasks[taskID - 1];
        task.isComplete = !task.isComplete;
        tasks[taskID - 1] = task;
        setTasks([...tasks]);
        let serverTask = { ...task };
        if (serverTask.isComplete == false) {
            serverTask.isComplete = 0;
        } else {
            serverTask.isComplete = 1;
        }
        console.dir(serverTask);
        server.putJSON("/api/tasks.php", serverTask, () => {console.log("Sucksess")}).catch((ex) => {
            console.error(ex);
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
                </div>
                {/* Form to add a new task */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <AddTaskForm onAddTask={handleAddTask} />
                </Modal>

                {/* Display the list of tasks */}
                <TasksList
                    tasks={tasks}
                    onCompletionChange={(taskID) => toggleTask(taskID)}
                />
                <div className="task-manager-service-buttons">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="task-manager-add"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        );
    } catch (ex) {
        console.error(ex);
        return (
            <>
                <h1>Task Manager is temporarily unavailable</h1>
                <center>
                    <h1>Unknown error occured</h1>
                    <h2>{JSON.stringify(tasks)}</h2>
                </center>
            </>
        );
    }
}

export default TaskManager;
