import { createAction, props } from '@ngrx/store';

export const crear = createAction(
    '[Todo] Crear TODO',
    props<{ texto: string }>()
);

export const toggle = createAction(
    '[Todo] Toggle TODO',
    props<{ id: number }>()
);