import moment from "moment";
import groupBy from "lodash/groupBy";
import { CommentEntityProps } from "../../../../constants";
import sortBy from "lodash/sortBy";

export const prepareComments = (comments: CommentEntityProps[]) => {
  const sorted = sortBy(comments, "creationDate");
  return sorted;
};

export const getPostData = (
  text: string,
  clientId: string,
  userProfileId: string = ""
) => ({
  entityId: clientId,
  entityType: "clients",
  commentText: text,
  userProfileId,
});
