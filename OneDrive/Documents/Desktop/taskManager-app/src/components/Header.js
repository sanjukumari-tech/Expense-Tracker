import React, { useState } from "react";
import Logo from "../assets/logo-mobile.svg";
import iconDown from "../assets/icon-chevron-down.svg";
import iconUp from "../assets/icon-chevron-up.svg";
import elipsis from "../assets/icon-vertical-ellipsis.svg";
import HeaderDropDown from "./HeaderDropDown";
import ElipsisMenu from "./ElipsisMenu";
import AddEditTaskModal from "../modals/AddEditTaskModal";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";

function Header({ setIsBoardModalOpen, isBoardModalOpen }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isElipsisMenuOpen, setIsElipsisMenuOpen] = useState(false);
  const [boardType, setBoardType] = useState("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const dispatch = useDispatch();
  
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown((state) => !state);
    setIsElipsisMenuOpen(false);
    setBoardType("add");
  };

  const setOpenEditModal = () => {
    setIsBoardModalOpen(true);
    setIsElipsisMenuOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisMenuOpen(false);
  };

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      setIsDeleteModalOpen(false);
    } else {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="px-4 py-3 fixed left-0 right-0 bg-white dark:bg-[#2b2c37] z-50 flex items-center justify-between shadow-sm">
      {/* Left Side */}
      <div className="flex items-center gap-2 md:gap-4 min-w-0">
        <img src={Logo} alt="Logo" className="h-6 w-6 flex-shrink-0" />
        <h3 className="text-2xl sm:text-3xl md:text-4xl hidden md:inline-block font-bold font-sans flex-shrink-0">
          Dashboard
        </h3>
        {/* Divider visible on md+ */}
        <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-600" />
        <div className="flex items-center gap-1 min-w-0">
          <h3 className="truncate max-w-[120px] xs:max-w-[160px] sm:max-w-[220px] md:max-w-xs text-base sm:text-lg md:text-2xl font-bold font-sans dark:text-white">
            {board.name}
          </h3>
          <img
            src={openDropdown ? iconUp : iconDown}
            alt="dropdown icon"
            className="w-3 ml-1 md:hidden flex-shrink-0 cursor-pointer"
            onClick={onDropdownClick}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
        <button
          className="button hidden sm:block text-sm md:text-base px-4 md:px-6"
          onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
        >
          + Add New Task
        </button>
        <button
          onClick={() => setIsTaskModalOpen((prevState) => !prevState)}
          className="button py-1.5 px-4 sm:hidden text-lg font-bold"
        >
          +
        </button>

        <img
          onClick={() => {
            setBoardType("edit");
            setOpenDropdown(false);
            setIsElipsisMenuOpen((prevState) => !prevState);
          }}
          src={elipsis}
          alt="elipsis"
          className="cursor-pointer h-6 flex-shrink-0"
        />
        {isElipsisMenuOpen && (
          <ElipsisMenu
            type="Boards"
            setOpenEditModal={setOpenEditModal}
            setOpenDeleteModal={setOpenDeleteModal}
          />
        )}
      </div>

      {openDropdown && (
        <HeaderDropDown
          setOpenDropdown={setOpenDropdown}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isTaskModalOpen && (
        <AddEditTaskModal
          setIsAddTaskModalOpen={setIsTaskModalOpen}
          type="add"
          device="mobile"
        />
      )}

      {isBoardModalOpen && (
        <AddEditBoardModal
          setBoardType={setBoardType}
          type={boardType}
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
