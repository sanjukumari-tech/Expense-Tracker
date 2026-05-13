import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import boardsSlice from "../redux/boardsSlice";


function HeaderDropDown({ setOpenDropdown, setIsBoardModalOpen }) {
  const dispatch = useDispatch()
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  return (
    <div
      className="fixed inset-0 top-[56px] z-40 bg-black/40 px-4 py-6 flex items-start justify-center md:hidden"
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpenDropdown(false);
      }}
    >
      {/* DropDown Modal */}
      <div className="bg-white dark:bg-[#2b2c37] shadow-xl shadow-[#364e7e1a] w-full max-w-sm py-4 rounded-2xl">
        <h3 className="dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-6 text-xs tracking-widest uppercase">
          All Boards ({boards?.length})
        </h3>

        <div>
          {boards.map((board, index) => (
            <div
              className={`flex items-center space-x-3 px-5 py-3 cursor-pointer rounded-r-full mr-4 transition-colors duration-200 ${
                board.isActive
                  ? "bg-[#635fc7] text-white"
                  : "text-gray-600 dark:text-white hover:bg-[#635fc71a] hover:text-[#635fc7] dark:hover:bg-white dark:hover:text-[#635fc7]"
              }`}
              key={index}
              onClick={() => {
                dispatch(boardsSlice.actions.setBoardActive({ index }));
                setOpenDropdown(false);
              }}
            >
              <img src={boardIcon} className="filter-white h-4 flex-shrink-0" alt="board icon" />
              <p className="text-sm font-bold truncate">{board.name}</p>
            </div>
          ))}

          <div
            onClick={() => {
              setIsBoardModalOpen(true);
              setOpenDropdown(false);
            }}
            className="flex items-center space-x-3 text-[#635fc7] px-5 py-3 cursor-pointer hover:bg-[#635fc71a] rounded-r-full mr-4 transition-colors"
          >
            <img src={boardIcon} className="filter-white h-4 flex-shrink-0" alt="board icon" />
            <p className="text-sm font-bold">+ Create New Board</p>
          </div>

          <div className="mx-3 mt-4 p-3 space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-xl">
            <img src={lightIcon} alt="light mode" />
            <Switch
              checked={darkSide}
              onChange={toggleDarkMode}
              className={`${
                darkSide ? "bg-[#635fc7]" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Toggle dark mode</span>
              <span
                className={`${
                  darkSide ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <img src={darkIcon} alt="dark mode" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
