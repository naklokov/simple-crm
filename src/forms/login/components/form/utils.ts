import Cookies from "js-cookie";
import { RuleObject } from "antd/lib/form";

export const storeRememberMeParams = () => {
  const rememberMe = Cookies.get("rememberMe");
  const username = Cookies.get("username");
  if (rememberMe && username) {
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("username", username);
  }
};

// TODO исправить на корректный тип у history
export const getPrevUrl = (history: any) =>
  history?.location?.state?.from?.pathname ?? "/";

export const getRules = (t: Function): { [key: string]: RuleObject[] } => ({
  username: [
    {
      type: "email",
      message: t("rules.username.format"),
    },
    {
      required: true,
      message: t("rules.username.required"),
    },
  ],
  password: [
    {
      required: true,
      message: t("rules.password.required"),
    },
  ],
});

export const getInitialValues = () => ({
  rememberMe: true,
});
