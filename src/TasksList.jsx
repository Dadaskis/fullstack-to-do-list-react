import Task from "./Task";
import './TasksList.css'

function TasksList({ tasks, onCompletionChange }) {
    return (
        <div className="tasks-list-body">
            {tasks.map((task) => (
                <Task
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    creationDate={task.creationDate}
                    isComplete={task.isComplete}
                    onCompletionChange={(taskID) => {onCompletionChange(taskID)}}
                />
            ))}
        </div>
    );
}

export default TasksList;
