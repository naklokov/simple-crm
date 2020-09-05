import { CLIENT_NEW_ID, ClientEntityProps } from "../../../constants";

export const getClientCardMode = (id: string) =>
  id === CLIENT_NEW_ID ? "add" : "view";

export const getClient = (id: string, clients?: ClientEntityProps[]) =>
  clients?.find((client) => client.id === id) ?? ({} as ClientEntityProps);
