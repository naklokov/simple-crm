import moment from "moment-timezone";
import { ProfileInfoProps } from "../../../constants";

export const getAddMetaValues = (profileInfo: ProfileInfoProps) => ({
  userProfileId: profileInfo.id ?? "",
  creationDate: moment().toISOString(),
});
