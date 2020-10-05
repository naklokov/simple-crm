import React, { useState, useCallback } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps, FORM_NAMES } from "../../constants";
import {
  defaultErrorHandler,
  defaultSuccessHandler,
  getFullUrl,
  useFormValues,
} from "../../utils";
import { Dropdown, Button, Menu, Popconfirm } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { setTableLoading } from "../../__data__";

interface ViewTaskProps {
  fields: FieldProps[];
  visible: boolean;
  title: string;
  setTableLoading: (loading: boolean) => void;
  onClose: (event: any, entity?: Store) => void;
  onDelete: (id: string) => void;
  onCompleted: (id: string) => void;
}

export const ViewTask = ({
  fields,
  visible,
  onClose,
  setTableLoading,
  onDelete,
  onCompleted,
  title,
}: ViewTaskProps) => {
  const [t] = useTranslation("tasksDrawer");
  const {
    values: { id, isOwner },
  } = useFormValues(FORM_NAMES.TASK_VIEW);
  const [loading, setLoading] = useState(false);

  const fetchDelete = async () => {
    setTableLoading(true);
    try {
      const url = getFullUrl(urls.tasks.entity, id);
      await axios.delete(url);
      defaultSuccessHandler(t("message.success.delete"));
      onDelete(id);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setTableLoading(false);
    }
  };

  const handleCompleted = useCallback(
    (event: React.MouseEvent) => {
      onCompleted(id);
      event.preventDefault();
    },
    [id, onCompleted]
  );

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={handleCompleted}>
          {t("additional.action.complete.title")}
        </a>
      </Menu.Item>
      <Menu.Item>
        <Popconfirm
          title={t("confirm.delete")}
          onConfirm={fetchDelete}
          placement="left"
        >
          <a target="_blank" rel="noopener noreferrer">
            {t("additional.action.remove.title")}
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const DropdownMenu = () => {
    return (
      <Dropdown key="more" overlay={menu}>
        <Button style={{ padding: "0 8px", border: "none" }}>
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    );
  };

  const onFinish = async (data: Store) => {
    try {
      setLoading(true);
      const url = getFullUrl(urls.tasks.entity, data.id);
      const responce = await axios.put(url, data);
      defaultSuccessHandler(t("message.success.edit"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error, defaultErrorMessage: t("message.error") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerForm
      title={title}
      fields={fields}
      name={FORM_NAMES.TASK_VIEW}
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
      headerButtons={isOwner ? [<DropdownMenu key="more" />] : []}
    />
  );
};

const mapDispathToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setTableLoading }, dispatch);

export default connect(null, mapDispathToProps)(ViewTask);
