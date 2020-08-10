import { ErrorProps } from "../../constants";

export const getError = (history: any, t: Function): ErrorProps => {
  return history?.location?.state?.error ?? t("subtitle.default");
};
