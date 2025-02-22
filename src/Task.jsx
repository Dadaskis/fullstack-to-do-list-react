import "./Task.css";
import { useState } from "react";

function Task({ id, title, description, creationDate, isComplete, onCompletionChange }) {
    // <p key={id}>
    //    {title} - {description}
    // </p>
    const [isChecked, setIsChecked] = useState(isComplete);
    const day = creationDate.split(" ")[0]
    const time = creationDate.split(" ")[1]
    return (
        <div className={isComplete ? "task-body-complete" : "task-body"}>
            <div className="task-left-div">
                <p className="task-id-label">{id}</p>
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked);
                        onCompletionChange(id);
                    }}
                />
            </div>
            <div className="task-div-mid">
                <h2 className="task-title">{title}</h2>
                <p className="task-description">{description}</p>
            </div>
            <div className="task-div-right">
                <p className="task-creation-date">{day}</p>
                <p className="task-creation-date">{time}</p>
            </div>
        </div>
    );
}

export default Task;
