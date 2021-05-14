import { createAction, props } from '@ngrx/store';

export const crear = createAction(
    '[Todo] Crear TODO',
    props<{ texto: string }>()
);

export const toggle = createAction(
    '[Todo] Toggle TODO',
    props<{ id: number }>()
);

export const editar = createAction(
    '[Todo] Editar TODO',
    props<{ id: number, texto: string }>()
);

export const borrar = createAction(
    '[Todo] Borrar TODO',
    props<{ id: number }>()
);

export const toggleAll = createAction(
    '[Todo] ToggleAll TODO',
    props<{ completado: boolean }>()
);

export const limpiarTodos = createAction(
    '[Todo] Borrar Completados TODO'
);