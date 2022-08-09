export enum TasksActionType {
  ADD_BOARD = 'ADD_BOARD',
  REMOVE_BOARD = 'REMOVE_BOARD',
  EDIT_BOARDS = 'EDIT_BOARDS',
}

export interface IItem {
  id: string;
  title: string;
  description: string;
}

export interface IInitialState {
  id: string;
  title: string;
  order: number;
  items: IItem[];
}

export interface ITasksAction {
  type: TasksActionType.ADD_BOARD | TasksActionType.REMOVE_BOARD | TasksActionType.EDIT_BOARDS;
  payload?: IInitialState;
  boards?: IInitialState[];
}
