import moment from "moment";
import { ColumnType } from "../../../constants";
import { fillTemplate } from "../../../utils";

type RecordType = { [key: string]: string };

const formatDate = (text: string, format: string): string =>
  moment(text).format(format);

const formatText = (text: string, format: string, record: RecordType): string =>
  fillTemplate(format, record);

const FORMAT_MAP: {
  [key: string]: (text: string, format: string, record: RecordType) => string;
} = {
  date: formatDate,
  string: formatText,
};

export const getFormattedText = (
  text: string,
  format: string = "",
  columnType: ColumnType,
  record: RecordType
) => {
  const method = FORMAT_MAP[columnType];
  if (method && format) {
    return method(text, format, record);
  }

  return text;
};
