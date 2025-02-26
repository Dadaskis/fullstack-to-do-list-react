import React, { useEffect, useState, useCallback } from "react";
import Server from "./Server";
import Utilities from "./Utilities";
import Modal from "./Modal";
import AddTaskForm from "./AddTaskForm";
import EditTaskForm from "./EditTaskForm";
import RemoveTaskForm from "./RemoveTaskForm";
import TasksList from "./TasksList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./TaskManager.css";

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [server] = useState(new Server());
    const [cantConnect, setCantConnect] = useState(false);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isMobileDeleteFormOpen, setIsMobileDeleteFormOpen] = useState(false);
    const [editedTaskIndex, setEditedTaskIndex] = useState(-1);
    const [removeTaskIndex, setRemoveTaskIndex] = useState(-1);
    const [removeTaskTitle, setRemoveTaskTitle] = useState("");

    const handleAddTask = (task) => {
        task.indexID = tasks.length;
        setIsAddFormOpen(false);
        server.postJSON("/api/tasks.php", task, (newTask) => {
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

            newTask.index = tasks.length;
            newTask.creationDate = formattedDate;
            setTasks([...tasks, newTask]);
        });
    };

    const handleEditTask = (index, task) => {
        tasks[index].title = task.title;
        tasks[index].description = task.description;
        setIsEditFormOpen(false);
        setEditedTaskIndex(-1);
        server.putJSON("/api/tasks.php", tasks[index]);
        setTasks([...tasks]);
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

    const deleteTask = useCallback((index) => {
        const task = tasks[index];
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
        server.deleteJSON("/api/tasks.php?id=" + task.id);
    });

    const editTask = useCallback((index) => {
        setEditedTaskIndex(index);
        setIsEditFormOpen(true);
    });

    const deleteTaskMobile = useCallback((index, title) => {
        setRemoveTaskIndex(index);
        setRemoveTaskTitle(title);
        setIsMobileDeleteFormOpen(true);
    });

    // Fetch tasks from the PHP API
    useEffect(() => {
        server
            .getJSON("/api/tasks.php", (data) => {
                Utilities.printDataDebug("Tasks data acquired", data);
                data.sort((a, b) => a.indexID - b.indexID);
                data.forEach((task, index) => {
                    task.index = index;
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
                        isOpen={isAddFormOpen}
                        onClose={() => setIsAddFormOpen(false)}
                    >
                        <AddTaskForm onAddTask={handleAddTask} />
                    </Modal>

                    {/* Form to edit a task */}
                    <Modal
                        isOpen={isEditFormOpen}
                        onClose={() => setIsEditFormOpen(false)}
                    >
                        <EditTaskForm
                            onEditTask={(index, task) =>
                                handleEditTask(index, task)
                            }
                            taskIndex={editedTaskIndex}
                            tasks={tasks}
                        />
                    </Modal>

                    {/* Form to remove a task /// MOBILE ONLY */}
                    <Modal
                        isOpen={isMobileDeleteFormOpen}
                        onClose={() => setIsMobileDeleteFormOpen(false)}
                    >
                        <RemoveTaskForm
                            onRemoveTask={() => {
                                setIsMobileDeleteFormOpen(false);
                                deleteTask(removeTaskIndex);
                            }}
                            title={removeTaskTitle}
                            onCancel={() => setIsMobileDeleteFormOpen(false)}
                        />
                    </Modal>

                    {/* Display the list of tasks */}
                    <TasksList
                        tasks={tasks}
                        onCompletionChange={(taskID) => toggleTask(taskID)}
                        moveTask={(dragIndex, hoverIndex) =>
                            moveTask(dragIndex, hoverIndex)
                        }
                        syncTasks={() => syncTasks()}
                        onDelete={(index) => {
                            deleteTask(index);
                        }}
                        onEdit={(index) => {
                            editTask(index);
                        }}
                        onMobileDelete={(index, title) => {
                            deleteTaskMobile(index, title);
                        }}
                    />
                    <div className="task-manager-service-buttons">
                        <button
                            onClick={() => setIsAddFormOpen(true)}
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
