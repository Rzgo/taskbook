import React, { useState } from 'react';
import './AppShell.scss';

import { Board, Header, Popup, Task } from '../../components';
import { IInitialState, IItem } from '../../types/types';
import { useAppSelector } from '../../hooks';

export const AppShell: React.FC = (): JSX.Element => {
  const boards = useAppSelector((state) => state.tasks);

  const [currentBoard, setCurrentBoard] = useState<IInitialState | null>(null);
  const [currentTask, setCurrentTask] = useState<IItem | null>(null);
  const [newTask, setNewTask] = useState<IItem | null>(null);
  const [editingMode, setEditingMode] = useState<boolean>(false);
  const [popupIsVisible, setPopupIsVisible] = useState<boolean>(false);

  return (
    <div className="app">
      <Header
        editingMode={editingMode}
        setEditingMode={setEditingMode}
        setPopupIsVisible={setPopupIsVisible}
        setNewTask={setNewTask}
      />
      <div className="app__container">
        {boards.map((board) => (
          <div className="app__board-wrapper" key={board.id}>
            <Board
              board={board}
              currentTask={currentTask}
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              editingMode={editingMode}
            >
              {board.items.map((task) => (
                <Task
                  key={task.id}
                  board={board}
                  task={task}
                  currentTask={currentTask}
                  currentBoard={currentBoard}
                  setCurrentBoard={setCurrentBoard}
                  setCurrentTask={setCurrentTask}
                  editingMode={editingMode}
                  setPopupIsVisible={setPopupIsVisible}
                />
              ))}
            </Board>
          </div>
        ))}
        {popupIsVisible && (
          <Popup
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            popupIsVisible={popupIsVisible}
            setPopupIsVisible={setPopupIsVisible}
            newTask={newTask}
            setNewTask={setNewTask}
          />
        )}
      </div>
    </div>
  );
};
