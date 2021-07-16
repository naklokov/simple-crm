import { DATE_FORMATS } from "../common";
import { urls, DrawerProps } from "..";
import { checkActualDate } from "../../utils";

const REQUIRED_MESSAGE = "Пожалуйста, заполните поле";
const PLACEHOLDER_DEFAULT = "Введите значение";
const TASK_DESCRIPTION_MAX_LENGTH = 2000;

interface TasksConfigProps {
  drawers: DrawerProps[];
}

export const TASKS: TasksConfigProps = {
  drawers: [
    {
      code: "task",
      name: "Новая задача",
      description: "Форма для добавления задачи",
      fields: [
        {
          fieldCode: "clientId",
          fieldName: "Компания",
          fieldDescription: "Компания связанная с задачей",
          type: "entity",
          titleField: "shortName",
          codeField: "id",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [],
          _links: {
            self: {
              href: `${urls.clients.entity}?query=userProfileId=={{userProfileId}}`,
            },
          },
        },
        {
          fieldCode: "taskEndDate",
          fieldName: "Дата и время",
          fieldDescription: "",
          type: "date",
          format: DATE_FORMATS.DATE_TIME,
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            { required: true, message: REQUIRED_MESSAGE },
            checkActualDate,
          ],
          permissions: [],
        },
        {
          fieldCode: "taskDescription",
          fieldName: "Описание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            {
              max: TASK_DESCRIPTION_MAX_LENGTH,
              message: `Превышена максимальная длина - ${TASK_DESCRIPTION_MAX_LENGTH} символов`,
            },
          ],
          permissions: [],
        },
      ],
    },
    {
      code: "taskView",
      name: "Просмотр задачи",
      description: "Форма для просмотра задачи",
      fields: [
        {
          fieldCode: "taskEndDate",
          fieldName: "Дата и время",
          fieldDescription: "",
          type: "date",
          format: DATE_FORMATS.DATE_TIME,
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [{ required: true, message: REQUIRED_MESSAGE }],
          permissions: [],
        },
        {
          fieldCode: "taskDescription",
          fieldName: "Описание",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: PLACEHOLDER_DEFAULT,
          rules: [
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: [],
        },
      ],
    },
    {
      code: "taskCompleted",
      name: "Выполнить задачу",
      description: "Форма для ввода комментария после выполнения задачи",
      fields: [
        {
          fieldCode: "note",
          fieldName: "Комментарий",
          fieldDescription: "",
          type: "string",
          format: "textarea",
          readonly: false,
          disabled: false,
          span: { xl: 24, md: 24, lg: 24, sm: 24 },
          placeholder: "Введите комментарий по выполненной задаче",
          rules: [
            { max: 2000, message: "Превышена максимальная длина строки" },
          ],
          permissions: [],
        },
      ],
    },
  ],
};
