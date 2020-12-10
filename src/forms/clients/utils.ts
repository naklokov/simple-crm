import { getEqualRsql } from "../../components/table/utils";

export const getPersonalClientsRsql = (userProfileId?: string) =>
  userProfileId ? [getEqualRsql("userProfileId", userProfileId)] : [];
