import "./Task.css";

function Task({ id, title, description, creationDate, isComplete }) {
    // <p key={id}>
    //    {title} - {description}
    // </p>
    const day = creationDate.split(" ")[0]
    const time = creationDate.split(" ")[1]
    return (
        <div className={isComplete ? "task-body-complete" : "task-body"}>
            <div>
                <p className="task-id-label">{id}</p>
                <input
                    type="checkbox"
                    //checked={isChecked}
                    //onChange={handleCheckboxChange}
                />
            </div>
            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className="task-div-right">
                <p className="task-creation-date">{day}</p>
                <p className="task-creation-date">{time}</p>
            </div>
        </div>
    );
}

export default Task;
