import { getEqualRsql } from "../../utils";

export const getPersonalClientsRsql = (userProfileId?: string) =>
  userProfileId ? [getEqualRsql("userProfileId", userProfileId)] : [];
