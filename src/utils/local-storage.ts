import { PersistState } from "../__data__/interfaces";
import { logger } from ".";

const STATE_ITEM = "state";

interface LocalStorageState {
  persist: PersistState;
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_ITEM);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    logger.error({ message: error.message });
  }
};

export const saveState = (state: LocalStorageState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_ITEM, serializedState);
  } catch (error) {
    logger.error({ message: error.message });
  }
};

export const clear = () => {
  try {
    localStorage.removeItem(STATE_ITEM);
  } catch (error) {
    logger.error({ message: error.message });
  }
};
