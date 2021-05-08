import { createReducer, on } from '@ngrx/store';
import { crear } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Salvar al Mundo'),
    new Todo('Comprar almuerzo'),
    new Todo('Sacar la basura'),
];

const _todoReducer = createReducer(
    initialState,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}