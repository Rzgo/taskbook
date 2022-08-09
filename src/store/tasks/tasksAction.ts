import { TasksActionType, IInitialState } from '../../types/types';

export const addBoard = (board: IInitialState) => {
  return {
    type: TasksActionType.ADD_BOARD,
    payload: board,
  };
};

export const removeBoard = (board: IInitialState) => {
  return {
    type: TasksActionType.REMOVE_BOARD,
    payload: board,
  };
};

export const updateBoards = (boards: IInitialState[]) => {
  return {
    type: TasksActionType.EDIT_BOARDS,
    boards: boards,
  };
};
