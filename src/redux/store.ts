import { configureStore } from '@reduxjs/toolkit';
import { firstReducer } from './reducers/firstReducer';

interface IReducer {
  firstReducer: (state: any, action: any) => any;
}

export const store = configureStore({
  reducer: {
    firstReducer: firstReducer,
  } as IReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
