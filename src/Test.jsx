import React, { useState } from "react";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });

  const handleDeleteClick = (taskId, event) => {
    // Get the position of the clicked button
    const buttonRect = event.target.getBoundingClientRect();
    setButtonPosition({
      top: buttonRect.top + window.scrollY, // Account for page scroll
      left: buttonRect.left + window.scrollX,
    });

    setTaskToDelete(taskId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    // Perform the delete operation here
    console.log("Deleting task:", taskToDelete);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  // Example tasks
  const tasks = [
    { id: 1, text: "Task 1" },
    { id: 2, text: "Task 2" },
  ];

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={(e) => handleDeleteClick(task.id, e)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={cancelDelete}>
          <div
            style={{
              ...styles.modal,
              top: buttonPosition.top - 110, // Position above the button
              left: buttonPosition.left - 240,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
          >
            <p>Are you sure you want to delete this task?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={cancelDelete}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default TodoList;