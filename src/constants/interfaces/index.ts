import { ReactNode } from "react";

export * from "./entities";
export * from "./form";
export * from "./store";

export type NotificationType = "CALL";

export type NotificationStatusType = "read" | "unread";

export interface NotificationProps {
  id: string;
  status?: NotificationStatusType;
  icon?: ReactNode;
  type?: NotificationType;
  title: ReactNode | string;
  content: ReactNode | string;
  dateTime?: string;
  clientId?: string;
}

export interface DictionaryProps {
  id?: string;
  dictionaryCode?: string;
  dictionaryName?: string;
  dictionaryDescription?: string;
  values?: OptionProps[];
}

export interface OptionProps {
  id: string;
  dictionaryId: string;
  valueCode: string;
  value: string;
  valueDescription?: string;
  deleted: boolean;
}

export interface ErrorProps {
  errorDescription?: string;
  errorCode?: string;
  errorMessage?: string;
  method?: string;
  url?: string;
}

export interface LocationLogoutProps {
  from: string;
}
