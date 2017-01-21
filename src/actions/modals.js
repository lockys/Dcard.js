import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';

export const pushModal = createAction(ActionTypes.PUSH_MODAL);
export const popModal = createAction(ActionTypes.POP_MODAL);
export const replaceModal = createAction(ActionTypes.REPLACE_MODAL);
