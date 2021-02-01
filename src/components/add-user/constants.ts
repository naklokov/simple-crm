import { FieldProps } from "../../constants";

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const EMAIL_MESSAGE = "Пожалуйста, введите корректный email";
const PLACEHOLDER_DEFAULT = "Введите значение";

export const NAME = 'ADD_USER'

export const TITLE = "Добавление пользователя";

export const SUCCESS_MESSAGE = "Пользователь успешно добавлен"

export const MANAGER_ROLE_ID = "733397ea-8436-44d4-9beb-2bc9e674e9e8"

export const FIELDS: FieldProps[] = [
    {
      fieldCode: "fullName",
      fieldName: "Ф.И.О.",
      fieldDescription: "",
      type: "string",
      readonly: false,
      disabled: false,
      span: { xl: 24, md: 24, lg: 24, sm: 24 },
      placeholder: PLACEHOLDER_DEFAULT,
      rules: [{ required: true, message: REQUIRED_MESSAGE }],
      permissions: [],
    },
    {
      fieldCode: "email",
      fieldName: "Email",
      fieldDescription: "",
      type: "email",
      readonly: false,
      disabled: false,
      span: { xl: 24, md: 24, lg: 24, sm: 24 },
      placeholder: PLACEHOLDER_DEFAULT,
      rules: [
        { required: true, message: REQUIRED_MESSAGE },
        {
          type: "email",
          message: EMAIL_MESSAGE,
        },
      ],
      permissions: [],
    }
  ]