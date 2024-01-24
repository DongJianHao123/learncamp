import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import calcReducer from './reducer/calc'
import currClientReducer from './reducer/currClient';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
// ...

const store = configureStore({
  reducer: {
    currClient: currClientReducer,
    // users: usersReducer,
    calc: calcReducer
  },
});

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store