import { CLIENT_NEW_ID } from "../../constants";

export const getClientCardMode = (id: string) =>
  id === CLIENT_NEW_ID ? "add" : "view";
