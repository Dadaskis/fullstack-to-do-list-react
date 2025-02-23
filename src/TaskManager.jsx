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
        console.dir(serverTask);
        server
            .putJSON("/api/tasks.php", serverTask, () => {
                console.log("Sucksess");
            })
            .catch((ex) => {
                console.error(ex);
            });
    };

    const moveTask = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = tasks[dragIndex];
            const hoverItem = tasks[hoverIndex];
            if (dragItem === hoverItem) {
                return;
            }
            // Swap places of dragItem and hoverItem in the tasks array
            setTasks((tasks) => {
                const updatedTasks = [...tasks];
                const id0 = dragItem.id;
                const id1 = hoverItem.id;
                dragItem.id = id1;
                hoverItem.id = id0;
                updatedTasks[dragIndex] = hoverItem;
                updatedTasks[hoverIndex] = dragItem;
                return updatedTasks;
            });
        },
        [tasks]
    );

    const updateTask = useCallback(
        (index, id) => {
            if(id != undefined) {
                const task = tasks.find(task => task.id === id);
                server.putJSON("/api/tasks.php", task);
                return
            }
            server.putJSON("/api/tasks.php", tasks[index]);
        }
    )

    // Fetch tasks from the PHP API
    useEffect(() => {
        server
            .getJSON("/api/tasks.php", (data) => {
                Utilities.printDataDebug("Tasks data acquired", data);
                setTasks(data);
                tasks.forEach((task, index) => {
                    task.index = index;
                });
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
                        moveTask={(dragIndex, hoverIndex, syncServer) =>
                            moveTask(dragIndex, hoverIndex, syncServer)
                        }
                        updateTask={(index, id) => updateTask(index, id)}
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
