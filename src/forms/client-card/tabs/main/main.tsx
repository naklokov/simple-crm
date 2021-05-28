import React, { useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { FieldsContainer } from "../../../../components";
import { fillLinks, getFullUrl, useFormValues } from "../../../../utils";
import {
  urls,
  QueryProps,
  FORM_NAMES,
  ClientEntityProps,
  TabPaneFormProps,
  CLIENT_NEW_ID,
  State,
} from "../../../../constants";
import { getAddMetaValues } from "../../utils";

const formName = FORM_NAMES.CLIENT_CARD;

export const Main: React.FC<TabPaneFormProps> = ({ tab }) => {
  const { id } = useParams<QueryProps>();
  const history = useHistory();
  const [, setClient] = useFormValues<ClientEntityProps>(formName);
  const profileInfo = useSelector(
    (state: State) => state?.persist?.profileInfo
  );

  const isAdd = id === CLIENT_NEW_ID;

  const handleFinishAdd = useCallback(
    (data: any) => {
      setClient(data);
      history.replace(getFullUrl(urls.clients.path, data?.id));
    },
    [history, setClient]
  );

  const handleFinishEdit = useCallback(
    (data: any) => {
      setClient(data);
    },
    [setClient]
  );

  // TODO убрать после первого запроса
  const modifyTab = useMemo(
    () => ({
      ...tab,
      _links: fillLinks(tab?._links, { id }),
    }),
    [tab, id]
  );

  const FieldsAddingContainer = useMemo(
    () => (
      <FieldsContainer
        defaultUrl={urls.clients.entity}
        formName={formName}
        tab={modifyTab}
        onFinish={handleFinishAdd}
        defaultValues={getAddMetaValues(profileInfo)}
        xhrMethod="post"
        initialLoad={false}
        withCancel={false}
      />
    ),
    [modifyTab, handleFinishAdd, profileInfo]
  );

  const FieldsEditContainer = useMemo(
    () => (
      <FieldsContainer
        formName={formName}
        tab={modifyTab}
        onFinish={handleFinishEdit}
      />
    ),
    [modifyTab, handleFinishEdit]
  );

  return isAdd ? FieldsAddingContainer : FieldsEditContainer;
};

export default Main;
