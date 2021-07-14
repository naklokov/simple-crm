import { ClientEntityProps } from "../../../constants";

export const getClient = (id: string, clients?: ClientEntityProps[]) =>
  clients?.find((client) => client.id === id) ?? ({} as ClientEntityProps);
