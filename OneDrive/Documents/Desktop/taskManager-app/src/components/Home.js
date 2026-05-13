import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";

function Home() {

  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <div
      className={
        isSideBarOpen
          ? "bg-[#f4f7fd] dark:bg-[#20212c] scrollbar-hide h-screen flex overflow-x-auto gap-6 ml-0 md:ml-[261px] pt-[60px]"
          : "bg-[#f4f7fd] dark:bg-[#20212c] scrollbar-hide h-screen flex overflow-x-auto gap-6 pt-[60px]"
      }
    >
      <Sidebar
        setIsBoardModalOpen={setIsBoardModalOpen}
        isBoardModalOpen={isBoardModalOpen}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />

      {/* Columns Section */}
      {columns.length > 0 ? (
        <>
          {columns.map((col, index) => (
            <Column key={index} colIndex={index} />
          ))}
          <div
            onClick={() => setIsBoardModalOpen(true)}
            className="h-screen dark:bg-[#2b2c3740] flex justify-center items-center font-bold text-2xl hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5 pt-[90px] min-w-[280px] text-[#828FA3] mt-[135px] rounded-lg"
          >
            + New Column
          </div>
        </>
      ) : (
        <EmptyBoard type="edit" />
      )}
      {isBoardModalOpen && (
        <AddEditBoardModal
          type="edit"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
