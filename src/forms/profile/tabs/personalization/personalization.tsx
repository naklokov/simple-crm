import { Button, Switch } from "antd";
import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { State, TabPaneFormProps } from "../../../../constants";
import { reloadCss } from "../../../../utils";
import { FormWrapper } from "../../../../wrappers";
import { setTheme } from "../../../../__data__";

export const Personalization: React.FC<TabPaneFormProps> = ({
  formName,
  tab,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector((state: State) => state?.persist?.theme);

  const handleChange = useCallback(
    (checked) => {
      dispatch(setTheme(checked ? "dark" : "light"));
    },
    [setTheme, dispatch]
  );

  const handleClick = useCallback(() => {
    reloadCss();
  }, []);

  return (
    <FormWrapper>
      <Switch
        checked={theme === "dark"}
        onChange={handleChange}
        unCheckedChildren="Light"
        checkedChildren="Dark"
      />

      <Button
        style={{ marginTop: 12, display: "block" }}
        onClick={handleClick}
        type="primary"
      >
        Сохранить и перезагрузить
      </Button>
    </FormWrapper>
  );
};

export default Personalization;
