import Task from "./Task";
import './TasksList.css'

function TasksList({ tasks }) {
    return (
        <div className="tasks-list-body">
            {tasks.map((task) => (
                <Task
                    id={task.id}
                    title={task.title}
                    description={task.description}
                />
            ))}
        </div>
    );
}

export default TasksList;
