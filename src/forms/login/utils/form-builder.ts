import { RuleObject } from "antd/lib/form";

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
