import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const Edit = ({ onEdit }: { onEdit: (value?: string) => void }) => {
  const [t] = useTranslation("comment");

  const handleClick = useCallback(() => {
    onEdit();
  }, []);

  return <span onClick={handleClick}>{t("button.edit")}</span>;
};

export default Edit;
