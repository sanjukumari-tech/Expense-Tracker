import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <>
      {/* Mobile backdrop overlay — closes sidebar when tapping outside */}
      {isSideBarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/40 md:hidden"
          onClick={() => setIsSideBarOpen(false)}
        />
      )}

      {/* Show sidebar FAB when closed (visible on all sizes) */}
      {!isSideBarOpen && (
        <button
          onClick={toggleSidebar}
          aria-label="Show Sidebar"
          className="fixed bottom-8 left-0 z-30 flex items-center justify-center w-14 h-12 rounded-r-full bg-[#635FC7] hover:bg-[#A8A4FF] transition-colors duration-200 shadow-lg"
        >
          <img src={showSidebarIcon} alt="Show Sidebar" />
        </button>
      )}

      {/* Sidebar Panel */}
      <div
        className={`
          fixed top-[56px] left-0 h-[calc(100vh-56px)] z-20
          bg-white dark:bg-[#2b2c37]
          flex flex-col justify-between
          transition-transform duration-300 ease-in-out
          ${isSideBarOpen ? "translate-x-0 w-[261px]" : "-translate-x-full w-[261px]"}
        `}
      >
        {/* Board list */}
        <div className="flex-1 overflow-y-auto py-4">
          <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-6 text-sm tracking-widest uppercase">
            All Boards ({boards?.length})
          </h3>

          <div className="flex flex-col">
            {boards.map((board, index) => (
              <div
                className={`flex items-center space-x-2 px-5 mr-8 rounded-r-full duration-300 ease-in-out py-3 cursor-pointer hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white ${
                  board.isActive
                    ? "bg-[#635fc7] text-white mr-8"
                    : ""
                }`}
                key={index}
                onClick={() => {
                  dispatch(boardsSlice.actions.setBoardActive({ index }));
                  // Auto-close on mobile after selecting a board
                  if (window.innerWidth < 768) setIsSideBarOpen(false);
                }}
              >
                <img src={boardIcon} className="filter-white h-4 flex-shrink-0" alt="board" />
                <p className="text-sm font-bold truncate">{board.name}</p>
              </div>
            ))}

            <div
              className="flex items-center space-x-2 mr-8 rounded-r-full duration-300 ease-in-out cursor-pointer text-[#635fc7] px-5 py-3 hover:bg-[#635fc71a] dark:hover:bg-white"
              onClick={() => setIsBoardModalOpen(true)}
            >
              <img src={boardIcon} className="filter-white h-4 flex-shrink-0" alt="board" />
              <p className="text-sm font-bold">+ Create New Board</p>
            </div>
          </div>
        </div>

        {/* Bottom: dark mode toggle + hide button */}
        <div className="pb-6 px-2 space-y-2">
          <div className="p-3 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
            <img src={lightIcon} alt="light mode" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <img src={darkIcon} alt="dark mode" />
          </div>

          <div
            onClick={toggleSidebar}
            className="flex items-center space-x-2 px-4 py-3 rounded-r-full hover:text-[#635FC7] hover:bg-[#635fc71a] dark:hover:bg-white cursor-pointer text-gray-500 text-sm font-bold transition-colors"
          >
            <img className="min-w-[20px]" src={hideSidebarIcon} alt="hide sidebar" />
            <p>Hide Sidebar</p>
          </div>
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </>
  );
}

export default Sidebar;
