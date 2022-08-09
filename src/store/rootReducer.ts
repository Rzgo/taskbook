import { combineReducers } from 'redux';
import { tasksReducer } from './tasks/tasksReducer';

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});
