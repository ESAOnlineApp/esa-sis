import React from "react";

const NotificationCards = ({ note }) => {
  const date = new Date(note.date);
  const formattedDate = date.toLocaleString();

  return (
    <div
      className={`mt-2 mb-5 px-6 py-4 bg-white rounded-lg shadow w-3/3 m-auto`}
    >
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <h2 className="font-bold text-2xl  text-gray-800">
            {note.sender_id == null
              ? "ESA"
              : `${note.pm_firstname} ${note.pm_lastname}`}
          </h2>
        </div>
        {note.viewed && <p>viewed</p>}
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
      <h5 className="font-bold text-base text-gray-800">{note.subject}</h5>
      <p
        className="mt-1 text-sm"
        dangerouslySetInnerHTML={{ __html: note.content }}
      ></p>
    </div>
  );
};

export default NotificationCards;
