import React from 'react';
import './Board.scss';
import classNames from 'classnames';

import { IInitialState, IItem } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeBoard, updateBoards } from '../../store/tasks/tasksAction';

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface IProps {
  board: IInitialState;
  currentTask: IItem | null;
  currentBoard: IInitialState | null;
  setCurrentBoard: (board: IInitialState) => void;
  editingMode: boolean;
  children: React.ReactNode;
}

export const Board: React.FC<IProps> = ({
  board,
  children,
  currentTask,
  currentBoard,
  setCurrentBoard,
  editingMode,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.tasks);

  const sortBoards = (a: IInitialState, b: IInitialState) => (a.order > b.order ? 1 : -1);

  const dropCardHandler = (e: React.DragEvent<HTMLDivElement>, board: IInitialState): void => {
    e.preventDefault();
    if (!editingMode) {
      if (currentTask && currentBoard) {
        board.items.push(currentTask);
        const currentIndex = currentBoard.items.indexOf(currentTask);
        currentBoard.items.splice(currentIndex, 1);

        const newBoards = boards.map((b) => {
          if (b.id === board.id) {
            return board;
          }
          if (b.id === currentBoard.id) {
            return currentBoard;
          }
          return b;
        });

        dispatch(updateBoards(newBoards));
      }
    } else {
      if (currentBoard) {
        const newBoards = boards.map((b) => {
          if (b.id === board.id) {
            return { ...b, order: currentBoard.order };
          }
          if (b.id === currentBoard.id) {
            return { ...b, order: board.order };
          }
          return b;
        });

        dispatch(updateBoards(newBoards.sort(sortBoards)));
      }
    }
  };

  const dragOverCardHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const dragStartCardHandler = (e: React.DragEvent<HTMLDivElement>, board: IInitialState): void => {
    if (editingMode) {
      setCurrentBoard(board);
    }
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newBoards = boards.map((b) => {
      if (b.id === board.id) {
        return { ...b, title: value };
      }
      return b;
    });
    dispatch(updateBoards(newBoards));
  };

  const deleteBoard = () => {
    dispatch(removeBoard(board));
  };

  return (
    <div
      className={classNames('board', { board_editingMode: editingMode })}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => dragStartCardHandler(e, board)}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => dragOverCardHandler(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => dropCardHandler(e, board)}
      draggable={editingMode}
    >
      {editingMode ? (
        <div className="board__title-container">
          <input value={board.title} onChange={changeTitle} className="board__input" />
          <IconButton aria-label="delete" onClick={deleteBoard} className="board__trash-icon">
            <DeleteIcon color="secondary" />
          </IconButton>
        </div>
      ) : (
        <div className="board__title">{board.title || '...'}</div>
      )}

      <div className="board__wrapper">{children}</div>
    </div>
  );
};
