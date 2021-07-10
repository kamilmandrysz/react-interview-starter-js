import { createSelector } from 'reselect';

const getModalState = (state, modal) => state.modal[modal];

export const selectModal$ = createSelector(getModalState, (modal) => modal || { props: {} });
