import React from "react";
import "./Modal.css"; // You can create this file for styling

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <br/>
                <br/>
                {children}
            </div>
        </div>
    );
};

export default Modal;
