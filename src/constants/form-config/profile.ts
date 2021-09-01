import urls from "../urls";
import { PERMISSIONS_SET } from "../permissions";
import { DATE_FORMATS } from "../common";
import { phoneRule } from "../../utils";
import { TabProps } from "../interfaces";

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
          permissions: [],
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
          permissions: [],
        },
        {
          fieldCode: "position",
          fieldName: "Должность",
          fieldDescription: "",
          type: "dictionary",
          readonly: false,
          disabled: false,
          rules: [],
          permissions: [],
          _links: {
            self: {
              href: urls.dictionaries.position,
            },
          },
        },
        {
          fieldCode: "branchAddress",
          fieldName: "Адрес филиала",
          fieldDescription: "",
          type: "dictionary",
          readonly: false,
          disabled: false,
          rules: [],
          permissions: [],
          _links: {
            self: {
              href: urls.dictionaries.branchAddresses,
            },
          },
        },
        {
          fieldCode: "email",
          fieldName: "E-mail",
          fieldDescription: "",
          type: "string",
          readonly: false,
          disabled: false,
          rules: [
            {
              type: "email",
              message: "Пожалуйста, введите корректный email",
            },
          ],
          permissions: [],
          _links: {
            validation: {
              href: urls.userProfiles.validation,
            },
          },
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
          permissions: [],
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
          permissions: [],
          disabled: false,
          rules: [
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
        },
        {
          fieldCode: "isLocked",
          fieldName: "Профиль заблокирован",
          fieldDescription: "",
          type: "switch",
          readonly: false,
          disabled: false,
          rules: [],
          permissions: PERMISSIONS_SET.USERPROFILES_UPDATE_DEPARTMENT,
        },
        {
          fieldCode: "departmentId",
          fieldName: "Отдел",
          fieldDescription: "",
          codeField: "id",
          titleField: "departmentName",
          type: "entity-lazy",
          readonly: true,
          disabled: false,
          rules: [],
          permissions: [],
          _links: {
            self: {
              href: urls.departments.paging,
            },
            redirect: {
              href: `${urls.departments.path}`,
            },
          },
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
