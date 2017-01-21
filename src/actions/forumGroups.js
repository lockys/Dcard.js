import {createAction} from 'redux-actions';
import {ActionTypes} from '../constants';

export const expandForumGroup = createAction(ActionTypes.EXPAND_FORUM_GROUP);
export const collapseForumGroup = createAction(ActionTypes.COLLAPSE_FORUM_GROUP);
