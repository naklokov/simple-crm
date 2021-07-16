import React, { Key, useCallback, useMemo, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Table } from "../../../../components";
import {
  DepartmentEntityProps,
  FormProps,
  FORM_NAMES,
  ProfileInfoEntityProps,
  urls,
} from "../../../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  pluralize,
  useFetch,
  useFormValues,
  useSelectableFooter,
} from "../../../../utils";
import { setTableLoading } from "../../../../__data__";

export const getTotalClients = (total: number) =>
  pluralize(total, [
    `Всего ${total} компания`,
    `Всего ${total} компании`,
    `Всего ${total} компаний`,
  ]);

export const Clients: React.FC<FormProps> = ({ tab, drawers }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation("selectableFooter");
  const [reloadKey, setReloadKey] = useState(uuidv4());
  const [department] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  const withRowSelection = department?.isOwner?.UPDATE;

  const [userProfiles] = useFetch<ProfileInfoEntityProps[]>({
    url: urls.userProfiles.entity,
  });

  const dataSource = useMemo(
    () =>
      userProfiles.map(({ id = "", fullName = "" }) => ({
        title: fullName,
        value: id,
      })),
    [userProfiles]
  );

  const handleSubmit = useCallback(
    async (selectedClientsIds: Key[], userProfileId: string) => {
      const url = urls.clients.entity;
      const data = selectedClientsIds.map((id) => ({ id, userProfileId }));

      try {
        dispatch(setTableLoading(true));
        await axios.put(url, data);
        defaultSuccessHandler(t("message.success.clients.move"));
        setReloadKey(uuidv4());
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        dispatch(setTableLoading(false));
      }
    },
    [dispatch, t]
  );

  const { rowSelection, footer } = useSelectableFooter({
    dataSource,
    onSubmit: handleSubmit,
    placeholder: t("clients.footer.select.placeholder"),
  });

  return (
    <Table.Server
      key={tab.tabCode}
      columns={tab.columns}
      actions={tab.actions}
      links={tab._links}
      getTotal={getTotalClients}
      withSearch
      footer={footer}
      rowSelection={withRowSelection ? rowSelection : undefined}
      reloadKey={reloadKey}
      defaultSortField="shortName"
    />
  );
};

export default Clients;
