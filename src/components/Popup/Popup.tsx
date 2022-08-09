import React from 'react';
import './Popup.scss';

import { v4 as uuidv4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateBoards } from '../../store/tasks/tasksAction';

import { Button } from '@material-ui/core';
import { IItem } from '../../types/types';

import DeleteIcon from '@material-ui/icons/Delete';

interface IProps {
  setPopupIsVisible: (value: boolean) => void;
  popupIsVisible: boolean;
  currentTask: IItem | null;
  setCurrentTask: (task: IItem | null) => void;
  newTask: IItem | null;
  setNewTask: (task: IItem | null) => void;
}

export const Popup: React.FC<IProps> = ({
  setPopupIsVisible,
  popupIsVisible,
  currentTask,
  setCurrentTask,
  newTask,
  setNewTask,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.tasks);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  const closePopup = () => {
    setPopupIsVisible(!popupIsVisible);
    setCurrentTask(null);
    setNewTask(null);
  };

  const saveEditedTask = () => {
    if (!newTask) {
      const newBoards = boards.map((b) => {
        const newItems = b.items.map((task) => {
          if (currentTask && task.id === currentTask.id) {
            return currentTask;
          }
          return task;
        });
        return { ...b, items: newItems };
      });
      dispatch(updateBoards(newBoards));
      setCurrentTask(null);
    } else {
      const newArray = [...boards];
      newArray[0].items.push({
        id: uuidv4(),
        title: newTask.title,
        description: newTask.description,
      });
      dispatch(updateBoards(newArray));
      setNewTask(null);
    }
    setPopupIsVisible(false);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!newTask) {
      const task = currentTask && { ...currentTask, title: value };
      setCurrentTask(task);
    } else {
      const task = { ...newTask, title: value };
      setNewTask(task);
    }
  };

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!newTask) {
      const newTask = currentTask && { ...currentTask, description: value };
      setCurrentTask(newTask);
    } else {
      const task = { ...newTask, description: value };
      setNewTask(task);
    }
  };

  const deleteTask = () => {
    if (currentTask) {
      const newBoards = boards.map((b) => {
        const newItems = b.items.filter((item) => item.id !== currentTask.id);
        return { ...b, items: newItems };
      });
      dispatch(updateBoards(newBoards));
      setPopupIsVisible(false);
      setCurrentTask(null);
      setNewTask(null);
    }
  };

  return (
    <div className="popup" onClick={closePopup}>
      <div className="popup__body">
        <div className="popup__content" onClick={handleClick}>
          <div className="popup__wrapper">
            <input value={currentTask?.title} onChange={changeTitle} className="popup__input" />
            <textarea
              value={currentTask?.description}
              onChange={changeDescription}
              className="popup__textarea"
            />
          </div>
          <div className="popup__buttons-wrapper">
            <Button variant="outlined" color="primary" onClick={saveEditedTask}>
              Сохранить
            </Button>
            <Button variant="outlined" color="secondary" onClick={closePopup}>
              Отменить
            </Button>
            {currentTask && (
              <Button variant="outlined" color="secondary" onClick={deleteTask}>
                <DeleteIcon color="secondary" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
