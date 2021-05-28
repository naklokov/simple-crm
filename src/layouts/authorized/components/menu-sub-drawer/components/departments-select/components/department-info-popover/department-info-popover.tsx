import React, { useCallback, useState } from "react";
import { Popover } from "antd";
import { TOOLTIP_SHOW_DELAY } from "../../../../../../../../constants";
import { ProfilesList } from "./components";
import { handlePressEnter } from "../../../../../../../../utils";

interface DepartmentInfoPopoverProps {
  children: React.ReactNode;
  departmentId: string;
}

export const DepartmentInfoPopover: React.FC<DepartmentInfoPopoverProps> = ({
  children,
  departmentId,
}) => {
  const [visible, setVisible] = useState(false);

  const handleChangeVisible = useCallback((value: boolean) => {
    setVisible(value);
  }, []);

  return (
    <Popover
      visible={visible}
      onVisibleChange={handleChangeVisible}
      mouseEnterDelay={TOOLTIP_SHOW_DELAY}
      placement="rightTop"
      trigger={["hover"]}
      content={<ProfilesList departmentId={departmentId} />}
    >
      {children}
    </Popover>
  );
};
export default DepartmentInfoPopover;
