import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { ComponentPermissionsChecker } from "../../../../../../wrappers";
import { DepartmentEntityProps, FORM_NAMES } from "../../../../../../constants";
import { useFormValues } from "../../../../../../utils";

interface RoleFooterProps {
  onClick: () => void;
}

export const RoleFooter: React.FC<RoleFooterProps> = ({ onClick }) => {
  const [t] = useTranslation("departmentInformation");

  const [{ isOwner }] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  return (
    <ComponentPermissionsChecker hasRight={isOwner?.UPDATE}>
      <Button style={{ marginTop: "16px" }} onClick={onClick}>
        {t("add.title")}
      </Button>
    </ComponentPermissionsChecker>
  );
};

export default RoleFooter;
