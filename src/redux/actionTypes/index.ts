interface IChangeValuePayload {
  value: number;
}

export interface IChangeValue {
  type: 'CHANGE_VALUE';
  payload: IChangeValuePayload;
}

export type ActionTypes = IChangeValue;
