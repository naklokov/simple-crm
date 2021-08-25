import React from "react";
import cn from "classnames";
import {
  BellOutlined,
  CalendarOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  ClusterOutlined,
  DeleteOutlined,
  DownOutlined,
  FormOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  LockOutlined,
  MailOutlined,
  NotificationOutlined,
  PhoneOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ArrowDirection } from "../../components/arrow/constants";

import {
  ERROR_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SUCCESS_COLOR,
  WARNING_COLOR,
} from "../../constants";

interface IconProps {
  className?: any;
  onClick?: () => void;
  colored?: boolean;
}

interface ArrowIconProps extends IconProps {
  direction: ArrowDirection;
}

export const PhoneIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <PhoneOutlined
    onClick={onClick}
    className={cn(className, { [SUCCESS_COLOR]: colored })}
  />
);

export const MailIcon: React.FC<IconProps> = ({ onClick, className }) => (
  <MailOutlined onClick={onClick} className={cn(className)} />
);

export const InfoIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <InfoCircleOutlined
    onClick={onClick}
    className={cn(className, { [PRIMARY_COLOR]: colored })}
  />
);

export const QuestionIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <QuestionCircleOutlined
    onClick={onClick}
    className={cn(className, { [SECONDARY_COLOR]: colored })}
  />
);

export const DeleteIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <DeleteOutlined
    onClick={onClick}
    className={cn(className, { [ERROR_COLOR]: colored })}
  />
);

export const UserIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <UserOutlined onClick={onClick} className={cn(className)} />
);

export const UserAddIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <UserAddOutlined
    onClick={onClick}
    className={cn(className, { [PRIMARY_COLOR]: colored })}
  />
);

export const ClockIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <ClockCircleOutlined
    onClick={onClick}
    className={cn(className, { [PRIMARY_COLOR]: colored })}
  />
);

export const CheckIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <CheckOutlined
    onClick={onClick}
    className={cn(className, { [SUCCESS_COLOR]: colored })}
  />
);

export const ViewIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <FormOutlined
    onClick={onClick}
    className={cn(className, { [SECONDARY_COLOR]: colored })}
  />
);

export const LockIcon: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <LockOutlined
    onClick={onClick}
    className={cn(className, { [WARNING_COLOR]: colored })}
  />
);

export const NotificationWarning: React.FC<IconProps> = ({
  className,
  onClick,
  colored = true,
}) => (
  <NotificationOutlined
    onClick={onClick}
    className={cn(className, { [WARNING_COLOR]: colored })}
  />
);

export const CalendarIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <CalendarOutlined onClick={onClick} className={cn(className)} />
);

export const DownIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <DownOutlined onClick={onClick} className={cn(className)} />
);

export const PlusIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <PlusOutlined onClick={onClick} className={cn(className)} />
);

export const SearchIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <SearchOutlined onClick={onClick} className={cn(className)} />
);

export const BellIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <BellOutlined onClick={onClick} className={cn(className)} />
);

export const DepartmentsIcon: React.FC<IconProps> = ({
  className,
  onClick,
}) => <ClusterOutlined onClick={onClick} className={cn(className)} />;

export const LinkIcon: React.FC<IconProps> = ({ className, onClick }) => (
  <LinkOutlined onClick={onClick} className={cn(className)} />
);

export const ArrowIcon: React.FC<ArrowIconProps> = ({
  direction,
  className,
  onClick,
}) => {
  const Icon = direction === "up" ? CaretUpOutlined : CaretDownOutlined;
  return <Icon onClick={onClick} className={cn(className)} />;
};

export const SupportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4.5 -4.5 35 35">
    <path d="M6.29,10.3a1,1,0,0,0,1.09,1.63,1.19,1.19,0,0,0,.33-.22,1,1,0,0,0,.21-.32A.85.85,0,0,0,8,11a1,1,0,0,0-.29-.7A1,1,0,0,0,6.29,10.3ZM7,5A1,1,0,0,1,7,7,1,1,0,0,0,7,9,3,3,0,1,0,4.4,4.5a1,1,0,0,0,.37,1.37A1,1,0,0,0,6.13,5.5,1,1,0,0,1,7,5ZM19,6H13a1,1,0,0,0,0,2h6a1,1,0,0,1,1,1v9.72l-1.57-1.45a1,1,0,0,0-.68-.27H9a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v1a3,3,0,0,0,3,3h8.36l3,2.73A1,1,0,0,0,21,22a1.1,1.1,0,0,0,.4-.08A1,1,0,0,0,22,21V9A3,3,0,0,0,19,6Z" />
  </svg>
);
