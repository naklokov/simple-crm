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

export const getTotalStaff = (total: number) =>
  pluralize(total, [
    `Всего ${total} сотрудник`,
    `Всего ${total} сотрудника`,
    `Всего ${total} сотрудников`,
  ]);

export const Staff: React.FC<FormProps> = ({ tab, drawers }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation("selectableFooter");
  const [reloadKey, setReloadKey] = useState(uuidv4());
  const [department] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  const withRowSelection = department?.isOwner?.UPDATE;

  const [departments] = useFetch<DepartmentEntityProps[]>({
    url: urls.departments.entity,
    cache: true,
  });

  const dataSource = useMemo(
    () =>
      departments
        .filter(({ id }) => department.id !== id)
        .map(({ departmentName, id }) => ({
          title: departmentName,
          value: id,
        })),
    [departments, department.id]
  );

  const handleSubmit = useCallback(
    async (selectedStaffIds: Key[], departmentId: string) => {
      const url = urls.userProfiles.entity;
      const data = selectedStaffIds.map((id) => ({ id, departmentId }));

      try {
        dispatch(setTableLoading(true));
        await axios.put(url, data);
        defaultSuccessHandler(t("message.success.staff.move"));
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
    placeholder: t("staff.footer.select.placeholder"),
  });

  return (
    <Table.Server
      key={tab.tabCode}
      columns={tab.columns}
      actions={tab.actions}
      links={tab._links}
      getTotal={getTotalStaff}
      footer={footer}
      rowSelection={withRowSelection ? rowSelection : undefined}
      reloadKey={reloadKey}
    />
  );
};

export default Staff;
