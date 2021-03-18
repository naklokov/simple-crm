import { PersistState } from "../constants";
import { logger } from ".";

const STATE_ITEM = "state";

const ERRORS_MESSAGE = {
  LOAD: "Ошибка при загрузке state из localStorage",
  SAVE: "Ошибка при сохранении state в localStorage",
  CLEAN: "Ошибка при очистке localStorage",
};

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
    logger.error({ message: error?.message ?? ERRORS_MESSAGE.LOAD });
  }

  return undefined;
};

export const saveState = (state: LocalStorageState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_ITEM, serializedState);
  } catch (error) {
    logger.error({ message: error?.message ?? ERRORS_MESSAGE.SAVE });
  }
};

export const clear = () => {
  try {
    localStorage.removeItem(STATE_ITEM);
  } catch (error) {
    logger.error({ message: error?.message ?? ERRORS_MESSAGE.CLEAN });
  }
};
