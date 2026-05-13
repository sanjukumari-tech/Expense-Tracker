import React from "react";

function ElipsisMenu({ type, setOpenEditModal, setOpenDeleteModal }) {
  return (
    <div
      className={
        type === "Boards"
          ? "absolute top-12 right-0 z-50"
          : "absolute top-8 right-0 z-50"
      }
    >
      <div className="flex justify-end items-center">
        <div className="w-44 text-sm z-50 font-medium shadow-lg shadow-[#364e7e1a] bg-white dark:bg-[#20212c] space-y-4 py-5 px-4 rounded-xl">
          <p
            onClick={() => setOpenEditModal()}
            className="cursor-pointer dark:text-gray-400 text-gray-700 hover:text-[#635fc7] dark:hover:text-[#635fc7] transition-colors"
          >
            Edit {type}
          </p>
          <p
            onClick={() => setOpenDeleteModal()}
            className="cursor-pointer text-red-500 hover:text-red-400 transition-colors"
          >
            Delete {type}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ElipsisMenu;
