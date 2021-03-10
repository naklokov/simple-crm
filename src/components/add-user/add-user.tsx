import React, { useCallback, useState } from "react";
import axios from "axios";
import { Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { DrawerForm } from "../drawer-form";
import {
  FIELDS,
  MANAGER_ROLE_ID,
  NAME,
  SUCCESS_MESSAGE,
  TITLE,
} from "./constants";
import { PERMISSIONS, urls } from "../../constants";
import { ComponentPermissionsChecker } from "../../wrappers";
import { Store } from "antd/es/form/interface";
import { defaultErrorHandler, defaultSuccessHandler } from "../../utils";

import style from "./add-user.module.scss";
import { ButtonLayout } from "../button-layout";

const AddUser = () => {
  const [visible, setVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleClick = useCallback(() => {
    setVisible(true);
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleFinish = useCallback(async (values: Store) => {
    setSubmitLoading(true);
    try {
      // жестко копируем логин из почты
      await axios.post(urls.userProfiles.entity, {
        login: values?.email,
        userRoleId: MANAGER_ROLE_ID,
        isLocked: false,
        ...values,
      });
      defaultSuccessHandler(SUCCESS_MESSAGE);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setSubmitLoading(false);
      setVisible(false);
    }
  }, []);

  return (
    <ComponentPermissionsChecker
      availablePermissions={[PERMISSIONS.USERPROFILES["ADD.ALL"]]}
    >
      <>
        <ButtonLayout tooltip={TITLE} onClick={handleClick}>
          <UserAddOutlined className={style.icon} />
        </ButtonLayout>
        <DrawerForm
          fields={FIELDS}
          name={NAME}
          title={TITLE}
          visible={visible}
          onClose={handleClose}
          onFinish={handleFinish}
          permissions={[PERMISSIONS.USERPROFILES["ADD.ALL"]]}
          submitLoading={submitLoading}
        />
      </>
    </ComponentPermissionsChecker>
  );
};

export default AddUser;
