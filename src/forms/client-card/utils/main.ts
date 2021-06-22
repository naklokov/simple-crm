import moment from "moment-timezone";
import { ProfileInfoEntityProps } from "../../../constants";

export const getAddMetaValues = (profileInfo: ProfileInfoEntityProps) => ({
  userProfileId: profileInfo?.id ?? "",
  creationDate: moment().toISOString(),
});
