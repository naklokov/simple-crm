import { ClientEntityProps } from "../../../constants";

export const getClient = (id: string, clients?: ClientEntityProps[]) =>
  clients?.find((client) => client.id === id);

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
