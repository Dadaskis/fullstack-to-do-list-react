import "./Task.css";
import React from "react";
import { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

function Task({
    id,
    index,
    title,
    description,
    creationDate,
    isComplete,
    onCompletionChange,
    moveTask,
    syncTasks,
}) {
    const [isChecked, setIsChecked] = useState(isComplete);

    const [DNDStartIndex, setDNDStartIndex] = useState(0);
    const [DNDEndIndex, setDNDEndIndex] = useState(0);

    const day = creationDate.split(" ")[0];
    const time = creationDate.split(" ")[1];

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: "task",
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [spec, dropRef] = useDrop({
        accept: "task",
        hover: (task, monitor) => {
            const dragIndex = task.index;
            const hoverIndex = index;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const hoverActualY =
                monitor.getClientOffset().y - hoverBoundingRect.top;

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

            //moveTask(dragIndex, hoverIndex);
            //task.index = hoverIndex;
            setDNDStartIndex(dragIndex);
            setDNDEndIndex(hoverIndex);
        },
        drop: () => {
            moveTask(DNDStartIndex, DNDEndIndex);
            syncTasks();
        },
    });

    const ref = React.useRef(null);
    const dragDropRef = dragRef(dropRef(ref));

    return (
        <div
            //ref={(node) => dragRef(dropRef(node))}
            ref={dragDropRef}
            className={
                isComplete ? "task task-body-complete" : "task task-body"
            }
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <div className="task-left-div">
                <p className="task-id-label">{index + 1}</p>
                <input
                    type="checkbox"
                    className="task-checkbox"
                    checked={isChecked}
                    onChange={() => {
                        setIsChecked(!isChecked);
                        onCompletionChange(index);
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
                <div className="task-edit-div">
                    <button>E</button>
                    <button>×</button>
                </div>
            </div>
        </div>
    );
}

export default Task;
