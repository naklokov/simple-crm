import axios from "axios";
import { FIELDS } from "../constants";
import { FormInstance } from "antd/lib/form";
import { urls } from "../../../constants";
import { logger } from "../../../utils";

export const checkEqualPasswords = (form: FormInstance) => {
  const password = form.getFieldValue(FIELDS.PASSWORD);
  const passwordConfirm = form.getFieldValue(FIELDS.PASSWORD_CONFIRM);
  return passwordConfirm === password;
};

export const checkToken = async (t: Function) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token") || void 0;
  try {
    await axios.post(urls.restorePassword.check, { token });

    logger.debug({
      message: t("check.success"),
      value: token,
    });
  } catch (error) {
    logger.error({
      message: t("check.error"),
      value: token,
    });
  }
};
