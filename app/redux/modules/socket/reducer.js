// @flow
import { socketState as initial } from '../defaultReducers';

export default function socketState(state = initial, action) {
  switch (action.type) {
    default:
      return state;
  }
}
