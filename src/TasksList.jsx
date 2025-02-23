import Task from "./Task";
import "./TasksList.css";

function TasksList({ tasks, onCompletionChange, moveTask, syncTasks }) {
    return (
        <div className="tasks-list-body">
            {tasks.map((task, index) => {
                if (task == undefined) {
                    return;
                }
                return (
                    <Task
                        id={task.id}
                        index={task.index}
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
                    />
                );
            })}
        </div>
    );
}

export default TasksList;
