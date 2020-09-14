import React, { useState } from "react";
import axios from "axios";
import { DrawerForm } from "../../components";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { urls, FieldProps, TASK_STATUSES, TASK_TYPES } from "../../constants";
import { defaultErrorHandler, defaultSuccessHandler } from "../../utils";
import { useParams } from "react-router";
import { ProfileInfoProps, State } from "../../__data__/interfaces";
import { useStore, connect } from "react-redux";

interface AddTaskProps {
  fields: FieldProps[];
  visible: boolean;
  profileInfo: ProfileInfoProps;
  onClose: (event: any, entity?: Store) => void;
}

export const AddTask = ({
  fields,
  visible,
  onClose,
  profileInfo: { id: userProfileId },
}: AddTaskProps) => {
  const [t] = useTranslation("tasksDrawer");
  const { id: clientId } = useParams();
  const [loading, setLoading] = useState(false);
  const metaAddingInfo = {
    taskStatus: TASK_STATUSES.NOT_COMPLETED,
    taskType: TASK_TYPES.CALL,
    clientId,
    userProfileId,
  };

  const onFinish = async (values: Store) => {
    setLoading(true);
    try {
      const responce = await axios.post(urls.tasks.entity, {
        ...values,
        ...metaAddingInfo,
      });
      defaultSuccessHandler(t("message.success.add"));
      onClose(void 0, responce?.data);
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerForm
      title={t("title.new")}
      fields={fields}
      name="taskAdd"
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo ?? {},
});

export default connect(mapStateToProps)(AddTask);