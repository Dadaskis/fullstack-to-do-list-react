import './Task.css'

function Task({ id, title, description }) {
    // <p key={id}>
    //    {title} - {description}
    // </p>
    return <div className="task-body">
        <div>
            <p className="task-id-label">{id}</p>
        </div>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    </div>;
}

export default Task;
