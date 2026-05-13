import React from "react";

function DeleteModal({ type, title, onDeleteBtnClick, setIsDeleteModalOpen }) {
  return (
    // Modal Container
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setIsDeleteModalOpen(false);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    >
      {/* Delete Modal */}
      <div className="w-full max-w-md bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold shadow-lg rounded-2xl px-6 py-8">
        <h3 className="font-bold text-red-500 text-lg sm:text-xl">
          Delete this {type}?
        </h3>
        {type === "task" ? (
          <p className="text-gray-500 font-semibold tracking-wide text-xs sm:text-sm pt-5 leading-relaxed">
            Are you sure you want to delete the &ldquo;{title}&rdquo; task and its subtasks?
            This action cannot be reversed.
          </p>
        ) : (
          <p className="text-gray-500 font-semibold tracking-wide text-xs sm:text-sm pt-5 leading-relaxed">
            Are you sure you want to delete the &ldquo;{title}&rdquo; board? This action
            will remove all columns and tasks and cannot be reversed.
          </p>
        )}

        <div className="flex w-full mt-6 items-center gap-4">
          <button
            onClick={onDeleteBtnClick}
            className="w-full text-white hover:opacity-75 bg-red-500 py-2.5 rounded-full text-sm font-bold transition-opacity"
          >
            Delete
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="w-full text-[#635fc7] dark:bg-white hover:opacity-75 bg-[#635fc71a] py-2.5 rounded-full text-sm font-bold transition-opacity"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
