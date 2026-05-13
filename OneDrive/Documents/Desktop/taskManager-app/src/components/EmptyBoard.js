import React, { useState } from "react";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function EmptyBoard({ type }) {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  return (
    <div className="bg-white dark:bg-[#2b2c37] h-screen w-screen flex flex-col items-center justify-center px-6 text-center">
      <h3 className="text-gray-500 font-bold text-base sm:text-lg max-w-xs sm:max-w-sm">
        {type === "edit"
          ? "This board is empty. Create a new column to get started."
          : "There are no boards available. Create a new board to get started"}
      </h3>
      <button
        onClick={() => setIsBoardModalOpen(true)}
        className="w-full items-center max-w-[200px] sm:max-w-xs font-bold hover:opacity-70 dark:text-white dark:bg-[#635fc7] mt-8 text-white bg-[#635fc7] py-2.5 rounded-full text-sm sm:text-base transition-opacity"
      >
        {type === "edit" ? "+ Add New Column" : "+ Add New Board"}
      </button>
      {isBoardModalOpen && (
        <AddEditBoardModal
          type={type}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default EmptyBoard;
