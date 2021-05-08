import { createReducer, on } from '@ngrx/store';
import { crear, toggle } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
    new Todo('Salvar al Mundo'),
    new Todo('Comprar almuerzo'),
    new Todo('Sacar la basura'),
];

const _todoReducer = createReducer(
    initialState,
    on(crear, (state, { texto }) => [...state, new Todo(texto)]),
    on(toggle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }
        })
    }),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}