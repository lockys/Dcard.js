import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';

export const expandPostBar = createAction(ActionTypes.EXPAND_POST_BAR);
export const collapsePostBar = createAction(ActionTypes.COLLAPSE_POST_BAR);

export function togglePostBar() {
  return (dispatch, getState) => {
    if (getState().postBar.expanded) {
      return dispatch(collapsePostBar());
    }

    return dispatch(expandPostBar());
  };
}
