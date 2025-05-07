import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const AlertComponent = ({
    message,
    actionLabel,
    onAction,
    duration = 5000,
    onClose,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setIsVisible(false), duration);
        return () => clearTimeout(timeout);
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    const handleAction = () => {
        if (onAction) onAction();
        // navigate("/carrito");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-10 left-10 bg-[#5339B1] text-white px-6 py-5 rounded-xl shadow-xl flex items-center space-x-4 z-[9999]"
                >
                    <span className="flex-grow">{message}</span>
                    {actionLabel && (
                        <a
                            href="/checkout"
                            className="bg-[#FF9900] text-white p-3 rounded-xl shadow"
                        >
                            {actionLabel}
                        </a>
                    )}
                    <button
                        onClick={handleClose}
                        className="bg-red-600 p-3 text-white ml-2 rounded-xl"
                    >
                        <X size={20} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AlertComponent;
