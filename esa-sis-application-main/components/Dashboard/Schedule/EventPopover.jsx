import React from 'react';

const EventPopover = ({ eventInfo, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  // Calculate the left position of the popover based on event position
  const popoverLeft = eventInfo.jsEvent.clientX - 220; // Adjust the offset as needed

  return (
    <div className="absolute z-10 w-64 bg-white shadow-lg rounded-lg p-4" style={{ left: popoverLeft }}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{eventInfo.event.title}</h3>
        <button
          onClick={handleClose}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          Close
        </button>
      </div>
      <div className="text-sm">
        <p><span className="font-bold">Start:</span> {eventInfo.event.start.toLocaleString()}</p>
        <p><span className="font-bold">End:</span> {eventInfo.event.end.toLocaleString()}</p>
        {/* Add more event details as needed */}
      </div>
    </div>
  );
};

export default EventPopover;
