import axios from "axios";
import { FormInstance } from "antd/lib/form";
import { FIELDS } from "../constants";
import { urls } from "../../../constants";
import { logger, defaultErrorHandler } from "../../../utils";

export const checkEqualPasswords = (form: FormInstance) => {
  const password = form.getFieldValue(FIELDS.PASSWORD);
  const passwordConfirm = form.getFieldValue(FIELDS.PASSWORD_CONFIRM);
  return passwordConfirm === password;
};

export const checkToken = async (
  token: string,
  t: Function,
  setLoading: Function
) => {
  try {
    setLoading(true);
    await axios.post(urls.restorePassword.check, { token });

    logger.debug({
      message: t("check.success"),
      value: token,
    });
  } catch (error) {
    defaultErrorHandler({ error, defaultErrorMessage: t("check.error") });
  } finally {
    setLoading(false);
  }
};

export const getToken = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("token") || "";
};
