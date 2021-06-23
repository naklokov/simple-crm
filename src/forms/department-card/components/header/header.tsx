import React, { useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { FormHeader, Skeleton } from "../../../../components";
import {
  BREADCRUMB_ROUTES,
  DepartmentEntityProps,
  FORM_NAMES,
  QueryProps,
} from "../../../../constants";
import {
  getTwoLastDisabledItemRender,
  getLoadingTwoLastDisabledItemRender,
  useFormValues,
} from "../../../../utils";

interface HeaderProps {
  footer?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ footer }) => {
  const history = useHistory();
  const { id: departmentId } = useParams<QueryProps>();

  const [{ departmentName: title }] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  const titleNode = !title ? <Skeleton.Title /> : title;

  const handleGoBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const breadcrumb = {
    routes: [
      ...BREADCRUMB_ROUTES.DEPARTMENTS,
      { path: `/${departmentId}`, breadcrumbName: title },
    ],
    itemRender: title
      ? getTwoLastDisabledItemRender
      : getLoadingTwoLastDisabledItemRender,
  };

  return (
    <FormHeader
      onBack={handleGoBack}
      title={titleNode}
      footer={footer}
      breadcrumb={breadcrumb}
    />
  );
};

export default Header;
