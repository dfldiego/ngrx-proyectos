import { createReducer, on } from '@ngrx/store';
import { crear } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [];

const _todoReducer = createReducer(
    initialState,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}