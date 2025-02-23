import Task from "./Task";
import "./TasksList.css";

function TasksList({ tasks, onCompletionChange, moveTask, updateTask }) {
    return (
        <div className="tasks-list-body">
            {tasks.map((task, index) => (
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
                    updateTask={(index, id) => {updateTask(index, id)}}
                />
            ))}
        </div>
    );
}

export default TasksList;
