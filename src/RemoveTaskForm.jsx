import React, { useState } from "react";
import "./Task.css";

function RemoveTaskForm({ onRemoveTask, onCancel, title }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onRemoveTask();
    };

    return (
        <form onSubmit={handleSubmit}>
            <center>
                <h2>Delete task</h2>
                <h2>{title}</h2>
                <br />
                <br />
                <h3>Are you sure you want to delete this task?</h3>
                <br />
                <br />
            </center>
            <div className="task-delete-modal-div-buttons-mobile">
                <button
                    type="submit"
                    className="task-delete-modal-div-btn-mobile task-delete-modal-div-confirm-btn"
                >
                    ✓
                </button>
                <button
                    type="cancel"
                    className="task-delete-modal-div-btn-mobile task-delete-modal-div-cancel-btn"
                    onClick={onCancel}
                >
                    ✗
                </button>
            </div>
        </form>
    );
}

export default RemoveTaskForm;
