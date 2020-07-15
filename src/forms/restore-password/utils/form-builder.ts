import { RuleObject } from "antd/lib/form";

interface RestorePasswordValues {
  password?: string;
  passwordConfirm?: string;
}

export const checkNotEqual = ({
  password,
  passwordConfirm,
}: RestorePasswordValues) => {
  console.log(passwordConfirm);
  return password !== passwordConfirm;
};

export const getRules = (t: Function): { [key: string]: RuleObject[] } => ({
  password: [
    {
      required: true,
      message: t("rules.password.required"),
    },
  ],
  passwordConfirm: [
    {
      required: true,
      message: t("rules.password.required"),
    },
  ],
});
