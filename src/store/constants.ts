import { IInitialState } from '../types/types';
import { v4 as uuidv4 } from 'uuid';

export const initialState: IInitialState[] = [
  {
    id: uuidv4(),
    title: 'Cделать',
    order: 1,
    items: [
      { id: uuidv4(), title: 'Карточка 1', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 2', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 3', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 4', description: 'описание' },
    ],
  },
  {
    id: uuidv4(),
    title: 'В работе',
    order: 2,
    items: [
      { id: uuidv4(), title: 'Карточка 5', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 6', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 7', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 8', description: 'описание' },
    ],
  },
  {
    id: uuidv4(),
    title: 'Завершено',
    order: 3,
    items: [
      { id: uuidv4(), title: 'Карточка 9', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 10', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 11', description: 'описание' },
      { id: uuidv4(), title: 'Карточка 12', description: 'описание' },
    ],
  },
];
