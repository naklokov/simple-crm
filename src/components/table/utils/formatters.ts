import moment from "moment";
import axios from "axios";
import { ColumnType } from "../../../constants";
import { fillTemplate, defaultErrorHandler } from "../../../utils";

type RecordType = { [key: string]: string };

type FormatType = "currency" | string;

const formatDate = (text: string, format: FormatType): string =>
  moment(text).format(format);

const formatText = (
  text: string,
  format: FormatType,
  record: RecordType
): string => fillTemplate(format, record);

export const formatNumber = (
  number: number | string,
  format: FormatType,
  record: RecordType
) => {
  const currency = record?.currency ?? "RUB";
  const formatter = new Intl.NumberFormat("ru-RU", {
    style: format,
    currency,
  });

  return formatter.format(+number);
};

const FORMAT_MAP: {
  [key: string]: (text: string, format: string, record: RecordType) => string;
} = {
  date: formatDate,
  string: formatText,
  number: formatNumber,
};

export const getFormattedText = (
  text: string,
  format: FormatType = "",
  columnType: ColumnType,
  record: RecordType
) => {
  const method = FORMAT_MAP[columnType];
  if (method) {
    return method(text, format, record);
  }

  return text;
};

// export const getDictionaryText = (
//   value: string,
//   columnCode: string,
//   record: any
// ) => {
//   try {
//     const url: string = record?._links?.[columnCode]?.href;
//     if (url) {
//       debugger;
//       const response = await axios.get(url);
//       const item = response?.data?.find((o: any) => o.valueCode === value);

//       if (item) {
//         return item.value;
//       }
//     }

//     return value;
//   } catch (error) {
//     defaultErrorHandler({
//       error,
//       defaultErrorMessage: "Про получении справочника таблицы произошла ошибка",
//     });
//   }
// };
