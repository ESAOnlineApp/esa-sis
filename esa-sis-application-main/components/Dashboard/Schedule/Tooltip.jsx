import React, { useEffect } from 'react';

const Tooltip = ({ content, position, active, onClose }) => {
  useEffect(() => {
    if (active) {
      const timer = setTimeout(() => {
        onClose(); // Close the tooltip after the specified timeout
      }, 3000);

      return () => {
        clearTimeout(timer); // Clear the timer if the tooltip is closed before the timeout
      };
    }
  }, [active, onClose]);

  if (!active) return null;

  return (
    <div
      className="absolute z-10 px-4 py-2 bg-white shadow-lg rounded-lg border border-gray-300"
      style={{ left: position.left, top: position.top }}
    >
      <div className="relative text-blue-500">{content}</div> {/* Apply blue color to content */}
    </div>
  );
};

export default Tooltip;
