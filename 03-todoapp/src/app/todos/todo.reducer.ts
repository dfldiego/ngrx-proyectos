import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, toggleAll } from './todo.actions';
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
    on(editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto: texto
                }
            } else {
                return todo;
            }
        })
    }),
    on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)),
    on(toggleAll, (state, { completado }) => state.map(todo => {
        return {
            ...todo,
            completado: completado
        }
    })),
);

export function todoReducer(state, action) {
    return _todoReducer(state, action);
}