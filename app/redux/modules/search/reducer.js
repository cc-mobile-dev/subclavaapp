// @flow
import { filter } from 'lodash';
import { ADD_TO_RECENT_SEARCHES } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.searchState;

export default function searchState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TO_RECENT_SEARCHES: {
      let newArray = [];
      const filtered = filter(state.recentSearches, item => item.id !== payload.id);
      newArray = [payload].concat(filtered);
      if (newArray.length > 5) {
        newArray = newArray.slice(0, 5);
      }

      return {
        ...state,
        recentSearches: newArray,
      };
    }
    default:
      return state;
  }
}
