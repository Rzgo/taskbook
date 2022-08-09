import React from 'react';
import './Header.scss';

import { v4 as uuidv4 } from 'uuid';

import { addBoard, updateBoards } from '../../store/tasks/tasksAction';
import { useAppDispatch, useAppSelector } from '../../hooks';

import Button from '@material-ui/core/Button';
import { IItem } from '../../types/types';

interface IProps {
  editingMode: boolean;
  setEditingMode: (value: boolean) => void;
  setPopupIsVisible: (value: boolean) => void;
  setNewTask: (task: IItem) => void;
}

export const Header: React.FC<IProps> = ({
  editingMode,
  setEditingMode,
  setPopupIsVisible,
  setNewTask,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.tasks);

  const value = editingMode ? 'Сохранить' : 'Редактировать';

  const changeMode = () => {
    setEditingMode(!editingMode);
  };

  const addNewBoard = () => {
    dispatch(
      addBoard({
        id: uuidv4(),
        title: '',
        order: boards.length + 1,
        items: [],
      })
    );
  };

  const deleteAll = () => {
    const clearedArray = [
      {
        id: uuidv4(),
        title: '',
        order: boards.length + 1,
        items: [],
      },
    ];
    dispatch(updateBoards(clearedArray));
  };

  const addNewTask = () => {
    const newTask = {
      id: uuidv4(),
      title: '',
      description: '',
    };
    setPopupIsVisible(true);
    setNewTask(newTask);
  };

  return (
    <div className="header">
      <div className="header__wrapper">
        <Button variant="outlined" color="primary" onClick={changeMode} className="header__button">
          {value}
        </Button>
        {!editingMode ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={addNewTask}
            className="header__button"
          >
            Добавить карточку
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            onClick={addNewBoard}
            className="header__button"
          >
            Добавить группу
          </Button>
        )}
        <Button variant="outlined" color="secondary" onClick={deleteAll} className="header__button">
          Полная очитска
        </Button>
      </div>
    </div>
  );
};
