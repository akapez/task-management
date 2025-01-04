import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./reducers/taskReducer";

export const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: taskReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
