import React, { useEffect, useState, useCallback } from "react";
import Server from "./Server";
import Utilities from "./Utilities";
import Modal from "./Modal";
import AddTaskForm from "./AddTaskForm";
import TasksList from "./TasksList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TaskManager.css";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [server] = useState(new Server());
    const [cantConnect, setCantConnect] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddTask = (task) => {
        setIsModalOpen(false);
        server.postJSON("/api/tasks.php", task, (newTask) => {
            newTask.index = tasks.length - 1;
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
            setTasks([...tasks, newTask]);
        });
    };

    const toggleTask = (taskIndex) => {
        const task = tasks[taskIndex];
        task.isComplete = !task.isComplete;
        tasks[taskIndex] = task;
        setTasks([...tasks]);
        let serverTask = { ...task };
        if (serverTask.isComplete == false) {
            serverTask.isComplete = 0;
        } else {
            serverTask.isComplete = 1;
        }
        server.putJSON("/api/tasks.php", serverTask).catch((ex) => {
            console.error(ex);
        });
    };

    const moveTask = useCallback((dragIndex, hoverIndex) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            const draggedTask = updatedTasks[dragIndex];
            updatedTasks.splice(dragIndex, 1);
            updatedTasks.splice(hoverIndex, 0, draggedTask);
            updatedTasks.forEach((task, index) => {
                task.index = index;
            });
            return updatedTasks;
        });
    }, []);

    const syncTasks = useCallback(() => {
        console.dir(tasks);
        setTasks((tasks) => {
            tasks.forEach((task, index) => {
                task.index = index;
                task.indexID = index;
            });
            server.postJSON("/api/tasks_reorder.php", tasks);
            return tasks;
        });
        //setTasks(newTasks);
    }, [tasks]);

    // Fetch tasks from the PHP API
    useEffect(() => {
        server
            .getJSON("/api/tasks.php", (data) => {
                Utilities.printDataDebug("Tasks data acquired", data);
                data.sort((a, b) => a.indexID - b.indexID);
                data.forEach((task) => {
                    task.index = task.indexID;
                });
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
            <DndProvider backend={HTML5Backend}>
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
                        moveTask={(dragIndex, hoverIndex) =>
                            moveTask(dragIndex, hoverIndex)
                        }
                        syncTasks={() => syncTasks()}
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
            </DndProvider>
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
