import React from "react";
import "./Modal.css"; // You can create this file for styling
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }} // Initial state
                animate={{ opacity: 1, scale: 1 }} // Target state
                exit={{ opacity: 0, scale: 0.8 }} // Exit state (optional)
                transition={{
                    type: "spring",
                    stiffness: 1200,
                    damping: 24,
                }} // Animation settings
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content">
                    <button className="modal-close" onClick={onClose}>
                        ×
                    </button>
                    <br />
                    <br />
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
