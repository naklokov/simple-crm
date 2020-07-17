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
});

export const getInitialValues = (history: any) => {
  const username = history?.location?.state?.username || "";
  return {
    username,
  };
};
