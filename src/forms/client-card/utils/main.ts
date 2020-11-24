import moment from "moment";
import { ProfileInfoProps } from "../../../constants";

export const getAddMetaValues = (profileInfo: ProfileInfoProps) => ({
  userProfileId: profileInfo.id ?? "",
  creationDate: moment().toISOString(),
});
