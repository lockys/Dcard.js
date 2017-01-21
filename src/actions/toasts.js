import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';

const TOAST_DURATION = 4000;

export const shiftToast = createAction(ActionTypes.SHIFT_TOAST);

export function pushToast(toast) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.PUSH_TOAST,
      payload: toast
    });

    setTimeout(() => {
      dispatch({
        type: ActionTypes.SHIFT_TOAST
      });
    }, TOAST_DURATION);
  };
}
