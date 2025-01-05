import { RootState } from "../store";

export const selectAllTaskItems = (state: RootState) => state.tasks.tasks;
