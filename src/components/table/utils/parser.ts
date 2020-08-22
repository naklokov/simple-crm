import moment from "moment";

import { ColumnType } from "../../../constants";

const formatDate = (text: string, format: string) =>
  moment(text).format(format);

const FORMAT_MAP: {
  [key: string]: (text: string, format: string) => string;
} = {
  date: formatDate,
};

export const getFormattedText = (
  text: string,
  format: string = "",
  columnType: ColumnType
) => {
  const method = FORMAT_MAP[columnType];
  if (method) {
    return method(text, format);
  }

  return text;
};
