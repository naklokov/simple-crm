import axios from "axios";

import { urls, ClientEntityProps } from "../../../constants";
import { fillTemplate } from "../../../utils";
import { ProfileInfoProps } from "../../../__data__/interfaces";

export const editPriceRow = async (
  row: any,
  client: ClientEntityProps,
  profileInfo: ProfileInfoProps
) => {
  const url = fillTemplate(urls.priceList.row, {
    id: row.itemId,
    clientId: client.id,
    userProfileId: profileInfo.id ?? "",
  });

  await axios.put(url, row);
};
