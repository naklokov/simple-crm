import React, { useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import { FieldsContainer } from "../../../../components";
import { fillLinks, useFormValues } from "../../../../utils";
import {
  QueryProps,
  FORM_NAMES,
  ClientEntityProps,
  TabPaneFormProps,
} from "../../../../constants";

const formName = FORM_NAMES.CLIENT_CARD;

export const Requisites = ({ tab }: TabPaneFormProps) => {
  const { id } = useParams<QueryProps>();
  const [, setClient] = useFormValues<ClientEntityProps>(
    FORM_NAMES.CLIENT_CARD
  );

  const handleFinish = useCallback(
    () => async (values: ClientEntityProps) => {
      setClient(values);
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

  return (
    <FieldsContainer
      formName={formName}
      tab={modifyTab}
      onFinish={handleFinish}
    />
  );
};

export default Requisites;
