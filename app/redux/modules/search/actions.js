// @flow

import { createAction } from 'redux-actions';

/**
 * Action Types
 */

export const ADD_TO_RECENT_SEARCHES = 'search/ADD_TO_RECENT_SEARCHES';

/**
 * Action Creators
 */
export const searchActionCreators = {
  addToRecentSearches: createAction(ADD_TO_RECENT_SEARCHES),
};
