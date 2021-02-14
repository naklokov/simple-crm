import { noop } from "lodash";
import { notifications } from "../assets/sounds";

export const play = () => {
  const audio = new Audio(notifications.plucky);
  return audio?.play().then(noop).catch(noop);
};
