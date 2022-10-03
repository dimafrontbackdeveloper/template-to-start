import { useActions } from './../../hooks/hooks';
import { IChangeValue } from '../actionTypes';
import { AppDispatch } from '../store';

export const changeValue = (value: number): IChangeValue => ({
  type: 'CHANGE_VALUE',
  payload: { value },
});
