import { sortBy } from "lodash";
import { CommentEntityProps } from "../../../../constants";

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
