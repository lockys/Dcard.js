import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';

export const showGallery = createAction(ActionTypes.SHOW_GALLERY);
export const closeGallery = createAction(ActionTypes.CLOSE_GALLERY);
export const popGallery = createAction(ActionTypes.POP_GALLERY);
export const pushGallery = createAction(ActionTypes.PUSH_GALLERY);
