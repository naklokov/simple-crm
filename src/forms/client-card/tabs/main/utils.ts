import axios, { AxiosResponse } from "axios";
import moment from "moment";
import { Store } from "antd/lib/form/interface";

import { fillTemplate } from "../../../../utils";
import { urls, ClientEntityProps } from "../../../../constants";
import { ProfileInfoProps } from "../../../../__data__/interfaces";

export const editClient = async (id: string, data: Store) => {
  const url = fillTemplate(urls.clientCard.entity, { id });
  const response: AxiosResponse<ClientEntityProps> = await axios.put(url, data);

  return response?.data ?? {};
};

export const addClient = async (data: Store) => {
  const url = urls.clients.entity;
  const response: AxiosResponse<ClientEntityProps> = await axios.post(
    url,
    data
  );
  return response?.data ?? {};
};

export const getAddMetaValues = (profileInfo: ProfileInfoProps) => ({
  userProfileId: profileInfo.id ?? "",
  creationDate: moment().toISOString(),
});

export const getClient = (id: string, clients?: ClientEntityProps[]) =>
  clients?.find((client) => client.id === id) ?? ({} as ClientEntityProps);
