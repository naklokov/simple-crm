import React from "react";
import { Typography } from "antd";

import style from "./login-header.module.scss";

const { Title } = Typography;

interface LoginHeaderProps {
  title?: string;
  description?: string;
}

export const LoginHeader: React.FC<LoginHeaderProps> = ({
  title,
  description,
}) => (
  <div>
    {title && (
      <Title className={style.title} level={2}>
        {title}
      </Title>
    )}
    {description && (
      <Title className={style.description} level={4} type="secondary">
        {description}
      </Title>
    )}
  </div>
);

export default LoginHeader;
