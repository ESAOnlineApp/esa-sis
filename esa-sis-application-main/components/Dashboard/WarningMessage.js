/*
 * Created By: Moetassem Chebbo
 * Project: SIS Application
 * File: components\Admin\WarningMessage.js
 * École Supérieure des Affaires (ESA)
 * Copyright (c) 2023 ESA
 */
import React from "react";
import Modal from "@mui/material/Modal";

function WarningMessageIncomplete({
  confirmOpenIncomplete,
  handleConfirmClose,
  handleConfirm,
}) {
  return (
    <Modal
      open={confirmOpenIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          Are you sure you want to Change this User s Status ?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
function WarningConfirmChangeEmail({
  confirmOpenIncomplete,
  handleConfirmClose,
  handleConfirm,
}) {
  return (
    <Modal
      open={confirmOpenIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          Are you sure you want to Change?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
function ReasonForDeactivation({
  confirmOpenIncomplete,
  handleConfirmClose,
  handleConfirm,
}) {
  const [reason, setReason] = React.useState("");
  return (
    <Modal
      open={confirmOpenIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          State a reason for changing User Status
        </p>
        <input
          type="text"
          value={reason}
          className="w-full mb-5"
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            disabled={reason == "" ? true : false}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              reason == "" ? "bg-gray-500" : ""
            }`}
            onClick={() => {
              handleConfirm(reason);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
}
function ReasonForActivation({
  confirmOpenIncomplete,
  handleConfirmClose,
  handleConfirm,
}) {
  const [reason, setReason] = React.useState("");
  return (
    <Modal
      open={confirmOpenIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          State a reason for changing User Status
        </p>
        <input
          type="text"
          value={reason}
          className="w-full mb-5"
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            disabled={reason == "" ? true : false}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              reason == "" ? "bg-gray-500" : ""
            }`}
            onClick={() => {
              handleConfirm(reason);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
}
function ReasonForHolding({
  confirmOpenIncomplete,
  handleConfirmClose,
  handleConfirm,
}) {
  const [reason, setReason] = React.useState("");
  return (
    <Modal
      open={confirmOpenIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          State a reason for changing User Status
        </p>
        <input
          type="text"
          value={reason}
          className="w-full mb-5"
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            disabled={reason == "" ? true : false}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              reason == "" ? "bg-gray-500" : ""
            }`}
            onClick={() => {
              handleConfirm(reason);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageUpdateCourse({
  confirmOpenIncomplete,
  handleConfirmClose,
  handleConfirm,
}) {
  return (
    <Modal
      open={confirmOpenIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          Are you sure you want to Update this Course ?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageObsolote({
  confirmOpenObsolote,
  handleConfirmClose,
  handleConfirm,
  isAssignPage,
  details,
}) {
  // // console.log(details)
  return (
    <Modal
      open={confirmOpenObsolote}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        {isAssignPage ? (
          <p className="text-gray-700 mb-4">
            Are you sure you want to UnAssign teacher{" "}
            <span className="text-red-500 font-bold">
              {details.teacher_firstname} {details.teacher_lastname}
            </span>{" "}
            from course{" "}
            <span className="text-red-500 font-bold">{details.course_id}</span>?
          </p>
        ) : (
          <p className="text-gray-700 mb-4">
            Are you sure you want to Delete this User?
          </p>
        )}

        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageCancleIncomplete({
  cancleIncomplete,
  handleConfirmClose,
}) {
  return (
    <Modal
      open={cancleIncomplete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          You are not permitted to alter the status as it is still incomplete.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageGrade({
  confirmOpenObsolote,
  handleConfirmClose,
  handleConfirm,
  details,
}) {
  return (
    <Modal
      open={confirmOpenObsolote}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          Are you sure you want to Change Grade{" "}
          <span className="text-red-500 font-bold">
            {details.first_name} {details.last_name}
          </span>{" "}
          for course{" "}
          <span className="text-red-500 font-bold">{details.courseid}</span>?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageStatus({
  confirmOpenObsolote,
  handleConfirmClose,
  handleConfirm,
}) {
  return (
    <Modal
      open={confirmOpenObsolote}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          Are you sure you want to Change status?{" "}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirm();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

function ErrorMessage({ handleOpenErrorMessage, handleCloseErroMessage }) {
  return (
    <Modal
      open={handleOpenErrorMessage}
      onClose={handleCloseErroMessage}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <h1 className="text-red-500 font-bold mb-5">An Error Occured!</h1>
        <p className="text-gray-700 mb-4">
          Column item already used by a user,you can&apos;t delete it.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleCloseErroMessage}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

function NotificatonMessages({
  handleOpenNotificatonMessages,
  handleCloseNotificatonMessages,
  handleSolvedClicked,
  selectedNotification,
}) {
  return (
    <Modal
      open={handleOpenNotificatonMessages}
      onClose={handleCloseNotificatonMessages}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <h1 className="text-red-500 font-bold mb-5">{`${selectedNotification[0].action}`}</h1>
        <p className="text-gray-700 mb-4">{`${selectedNotification[0].message}`}</p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleCloseNotificatonMessages}
          >
            Close
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleSolvedClicked}
          >
            Solved
          </button>
        </div>
      </div>
    </Modal>
  );
}
function NotificatonMessage({
  handleOpenNotificatonMessages,
  handleCloseNotificatonMessages,
  messages,
}) {
  return (
    <Modal
      open={handleOpenNotificatonMessages}
      onClose={handleCloseNotificatonMessages}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <h1 className="text-red-500 font-bold mb-5"></h1>
        <h3 className="text-gray-600 mb-4">{messages}</h3>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleCloseNotificatonMessages}
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageDelete({
  confirmOpenDelete,
  handleConfirmClose,
  handleConfirmDelete,
  selectedUser,
}) {
  return (
    <Modal
      open={confirmOpenDelete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 mb-4">
          {`Are you sure you want to delete ${selectedUser.fname} ${selectedUser.lname} account?`}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirmDelete();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
function WarningMessageNotVerified({
  confirmOpenNotVerified,
  handleConfirmClose,
  handleConfirmNotVerified,
  selectedUser,
}) {
  return (
    <Modal
      open={confirmOpenNotVerified}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 font-bold mb-4">
          {`Are you sure you want to lock ${selectedUser.fname} ${selectedUser.lname}'s account?`}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirmNotVerified();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

function WarningMessageVerified({
  confirmOpenVerified,
  handleConfirmClose,
  handleConfirmVerified,
  selectedUser,
}) {
  return (
    <Modal
      open={confirmOpenVerified}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 font-bold mb-4">
          {`Are you sure you want to unlock ${selectedUser.fname} ${selectedUser.lname}'s account?`}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirmVerified();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
function WarningMessageSchedule({
  confirmOpenDelete,
  handleConfirmClose,
  details,
}) {
 
  return (
    <Modal
      open={confirmOpenDelete}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <h1 className="text-red-700 font-bold text-4xl text-center mb-6">
          {details.course}
        </h1>
        <h3 className="text-slate-500 font-bold text-base text-center mb-6">
          {details.date.toDateString()}
        </h3>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              confirmOpenDelete();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}
function WarningMessageChange({
  confirmOpenVerified,
  handleConfirmClose,
  handleConfirmVerified,
  selectedUser,
  majorName
  
}) {
  return (
    <Modal
      open={confirmOpenVerified}
      onClose={handleConfirmClose}
      className="top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-10">
        <p className="text-gray-700 font-bold mb-4">

          {`Are you sure you want to assign new major ${majorName} to program manager ${selectedUser.pm_firstname} ${selectedUser.pm_lastname}'s account?`}
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-4"
            onClick={handleConfirmClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleConfirmVerified();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export {
  WarningMessageChange,
  WarningMessageIncomplete,
  WarningMessageStatus,
  WarningMessageGrade,
  WarningMessageUpdateCourse,
  WarningMessageObsolote,
  WarningMessageSchedule,
  WarningMessageCancleIncomplete,
  ReasonForDeactivation,
  ErrorMessage,
  ReasonForActivation,
  NotificatonMessage,
  WarningMessageDelete,
  WarningMessageNotVerified,
  WarningMessageVerified,
  NotificatonMessages,
  ReasonForHolding,
  WarningConfirmChangeEmail,
};
