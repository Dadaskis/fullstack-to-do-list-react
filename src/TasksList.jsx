import Task from "./Task";
import "./TasksList.css";

function TasksList({
    tasks,
    onCompletionChange,
    moveTask,
    syncTasks,
    onDelete,
    onEdit,
    onMobileDelete
}) {
    return (
        <div className="tasks-list-body">
            {tasks.map((task, index) => {
                if (task == undefined) {
                    return;
                }
                return (
                    <Task
                        id={task.id}
                        index={index}
                        title={task.title}
                        description={task.description}
                        creationDate={task.creationDate}
                        isComplete={task.isComplete}
                        onCompletionChange={(taskIndex) => {
                            onCompletionChange(taskIndex);
                        }}
                        moveTask={(dragIndex, hoverIndex) => {
                            moveTask(dragIndex, hoverIndex);
                        }}
                        syncTasks={() => syncTasks()}
                        taskCount={tasks.length}
                        moveUp={(index) => {
                            moveTask(index, index - 1);
                            syncTasks();
                        }}
                        moveDown={(index) => {
                            moveTask(index, index + 1);
                            syncTasks();
                        }}
                        onDelete={(index) => {
                            onDelete(index);
                        }}
                        onEdit={(index) => onEdit(index)}
                        onMobileDelete={(index, title) => onMobileDelete(index, title)}
                    />
                );
            })}
        </div>
    );
}

export default TasksList;
