import { IFirstReducerState } from './../reducersTypes/firstReducerType';
import { ActionTypes } from '../actionTypes';

const initialState: IFirstReducerState = {
  value: 1,
};

export const firstReducer = (state = initialState, action: ActionTypes): IFirstReducerState => {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return {
        ...state,
        value: action.payload.value,
      };

    default:
      return state;
  }
};
