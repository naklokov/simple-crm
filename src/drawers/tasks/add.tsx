import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Store } from "antd/lib/form/interface";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  urls,
  TASK_STATUSES,
  TASK_TYPES,
  QueryProps,
  FORM_NAMES,
  ProfileInfoEntityProps,
  State,
  DrawerFormProps,
  TaskEntityProps,
} from "../../constants";
import { defaultErrorHandler, defaultSuccessHandler } from "../../utils";
import { DrawerForm } from "../../components";

interface AddTaskProps extends DrawerFormProps {
  profileInfo: ProfileInfoEntityProps;
}

export const AddTask = ({
  title,
  fields,
  visible,
  onClose,
  profileInfo: { id: userProfileId },
}: AddTaskProps) => {
  const [t] = useTranslation("tasksDrawer");
  const { id: clientId } = useParams<QueryProps>();
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
      const response = await axios.post(urls.tasks.entity, {
        ...metaAddingInfo,
        ...values,
      });
      defaultSuccessHandler(t("message.success.add"));

      onClose<TaskEntityProps>(response?.data ?? {});
    } catch (error) {
      defaultErrorHandler({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DrawerForm
      title={title}
      fields={fields}
      name={FORM_NAMES.TASK_ADD}
      onClose={onClose}
      visible={visible}
      submitLoading={loading}
      onFinish={onFinish}
    />
  );
};

const mapStateToProps = (state: State) => ({
  profileInfo: state?.persist?.profileInfo,
});

export default connect(mapStateToProps)(AddTask);
