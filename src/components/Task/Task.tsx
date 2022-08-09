import React from 'react';
import './Task.scss';

import { IInitialState, IItem } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateBoards } from '../../store/tasks/tasksAction';

import { IconButton } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

interface IProps {
  task: IItem;
  board: IInitialState;
  currentTask: IItem | null;
  currentBoard: IInitialState | null;
  setCurrentBoard: (board: IInitialState) => void;
  setCurrentTask: (task: IItem | null) => void;
  editingMode: boolean;
  setPopupIsVisible: (value: boolean) => void;
}

export const Task: React.FC<IProps> = ({
  task,
  board,
  currentTask,
  currentBoard,
  setCurrentBoard,
  setCurrentTask,
  editingMode,
  setPopupIsVisible,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.tasks);

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IInitialState,
    task: IItem
  ): void => {
    setCurrentBoard(board);
    setCurrentTask(task);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const dropHandler = (
    e: React.DragEvent<HTMLDivElement>,
    board: IInitialState,
    task: IItem
  ): void => {
    e.preventDefault();
    e.stopPropagation();

    if (currentTask && currentBoard) {
      const currentIndex = currentBoard.items.indexOf(currentTask);
      currentBoard.items.splice(currentIndex, 1);

      const dropIndex = board.items.indexOf(task);
      board.items.splice(dropIndex + 1, 0, currentTask);

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
      setCurrentTask(null);
    }
  };

  const editTask = () => {
    setCurrentTask(task);
    setPopupIsVisible(true);
  };

  return (
    <div
      key={task.id}
      className="task"
      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
        !editingMode && dragStartHandler(e, board, task)
      }
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => !editingMode && dragOverHandler(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => !editingMode && dropHandler(e, board, task)}
      draggable={!editingMode}
    >
      <div className="task__header">
        <h3 className="task__title">{task.title}</h3>
        <IconButton onClick={editTask} disabled={editingMode} className="task__button">
          <CreateIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="task__description">{task.description}</div>
    </div>
  );
};
