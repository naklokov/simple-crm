import { ClientEntityProps, CLIENT_NEW_ID } from "../../../constants";

export const getClient = (id: string, clients?: ClientEntityProps[]) =>
  clients?.find((client) => client.id === id);

export const getClientCardMode = (id: string) =>
  id === CLIENT_NEW_ID ? "add" : "view";

export const getUpdatedClients = (
  entity: ClientEntityProps,
  clients: ClientEntityProps[]
) =>
  clients.map((client) => {
    if (client.id === entity.id) {
      return entity;
    }

    return client;
  });
