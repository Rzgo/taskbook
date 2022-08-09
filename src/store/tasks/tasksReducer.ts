import { initialState } from '../constants';
import { ITasksAction, TasksActionType, IInitialState } from '../../types/types';

export const tasksReducer = (state = initialState, action: ITasksAction): IInitialState[] => {
  switch (action.type) {
    case TasksActionType.ADD_BOARD: {
      const newState = action.payload ? [...state, action.payload] : state;
      return newState;
    }
    case TasksActionType.REMOVE_BOARD: {
      const newState = [...state].filter((board) => board.id !== action.payload?.id);
      return newState;
    }
    case TasksActionType.EDIT_BOARDS: {
      return action.boards ? action.boards : state;
    }
    default:
      return state;
  }
};
