import { urls } from "..";
import { PERMISSIONS } from "../permissions";
import { DATE_FORMATS } from "../common";
import { phoneRule } from "../../utils";
import { TabProps } from "../interfaces";

const { USERPROFILES } = PERMISSIONS;

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";

const PLACEHOLDER_DEFAULT = "Введите значение";
const PHONE_PLACEHOLDER = "+7 (___) ___-__-__";

export const FORM: { tabs: TabProps[] } = {
  tabs: [
    {
      tabCode: "profileMain",
      tabName: "Профиль",
      tabDescription: "Информация о профиле",
      type: "container",
      fields: [
        {
          fieldCode: "fullName",
          fieldName: "Ф.И.О.",
          fieldDescription: "",
          type: "string",
          placeholder: PLACEHOLDER_DEFAULT,
          readonly: false,
          disabled: false,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [USERPROFILES["UPDATE.ALL"]],
        },
        {
          fieldCode: "birthDate",
          fieldName: "Дата рождения",
          fieldDescription: "",
          type: "date",
          format: DATE_FORMATS.DATE,
          readonly: false,
          disabled: false,
          withSelectBefore: true,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [USERPROFILES["UPDATE.ALL"]],
        },
        {
          fieldCode: "position",
          fieldName: "Должность",
          fieldDescription: "",
          type: "dictionary",
          readonly: false,
          disabled: false,
          rules: [],
          permissions: [USERPROFILES["UPDATE.ALL"]],
          _links: {
            self: {
              href: urls.dictionaries.position,
            },
          },
        },
        {
          fieldCode: "email",
          fieldName: "Email",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: true,
          rules: [
            {
              type: "email",
              message: "Пожалуйста, введите корректный email",
            },
          ],
          permissions: [USERPROFILES["UPDATE.ALL"]],
        },
        {
          fieldCode: "location",
          fieldName: "Адрес",
          fieldDescription: "",
          type: "string",
          placeholder: PLACEHOLDER_DEFAULT,
          readonly: false,
          disabled: false,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [USERPROFILES["UPDATE.ALL"]],
        },
        {
          fieldCode: "phone",
          fieldName: "Мобильный телефон",
          fieldDescription: "",
          type: "phone",
          readonly: false,
          disabled: false,
          placeholder: PHONE_PLACEHOLDER,
          rules: [phoneRule],
          permissions: [USERPROFILES["UPDATE.ALL"]],
        },
        {
          fieldCode: "aboutMe",
          fieldName: "О себе",
          type: "string",
          format: "textarea",
          placeholder:
            "Введите информацию о ваших увлечениях, хобби, интересах...",
          fieldDescription: "Максимум 2000 символов",
          readonly: false,
          permissions: [USERPROFILES["UPDATE.ALL"]],
          disabled: false,
          rules: [
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          span: { lg: 12, xl: 10 },
        },
      ],
      _links: {
        self: {
          href: `${urls.userProfiles.entity}/{{userProfileId}}`,
        },
        userProfileId: {
          href: urls.userProfiles.entity,
        },
      },
    },
  ],
};
