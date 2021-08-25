import React, { useCallback, useEffect, useState } from "react";
import { Space, Typography } from "antd";
import cn from "classnames";
import { useSelector } from "react-redux";
import style from "./jivo-support.module.scss";
import { SECONDARY_BACKGROUND_COLOR, State } from "../../constants";
import { SupportIcon } from "../../assets/icons";
import {
  initJivoScript,
  setJivoChatVisibility,
  setJivoUserInfo,
} from "./utils";

const JivoSupport: React.FC = () => {
  useEffect(() => {
    initJivoScript();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const { profileInfo } = useSelector((state: State) => state.persist);

  window.jivo_onClose = () => {
    setIsOpen(false);
    setJivoChatVisibility("hidden");
  };

  window.jivo_onOpen = () => {
    setIsOpen(true);
    setJivoChatVisibility("visible");
  };

  const handleOpen = useCallback(() => {
    jivo_api.open();
    setJivoUserInfo(profileInfo);
  }, [profileInfo]);

  return (
    <Space
      className={cn(style.supportWidgets, {
        [style.hiddenSupport]: isOpen,
      })}
    >
      <Typography.Link
        className={cn(style.supportBtn, SECONDARY_BACKGROUND_COLOR)}
        onClick={handleOpen}
      >
        <SupportIcon />
      </Typography.Link>
    </Space>
  );
};

export default JivoSupport;
