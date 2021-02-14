export type TaskStatusType = "COMPLETED" | "NOT_COMPLETED" | "ACTIVE";

export type TaskTypeType = "CALL";

export interface EntityOwnerProps {
  id: string;
  isOwner: {
    DELETE: boolean;
    UPDATE: boolean;
  };
}

export interface ProfileInfoProps extends EntityOwnerProps {
  aboutMe?: string;
  birthDate?: string;
  businessId?: string;
  creationDate?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  location?: string;
  login?: string;
  parentId?: string;
  position?: string;
  userRoleId?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  isLocked?: boolean;
}

export interface ClientEntityProps extends EntityOwnerProps {
  activityField: string;
  address: string;
  businessId: string;
  checkingAccount: string;
  city: string;
  corrdespondentAccount: string;
  creationDate: string;
  email: string;
  fullName: string;
  inn: string;
  isActive: boolean;
  isDeleted: boolean;
  kpp: string;
  legalAddress: string;
  userProfileId: string;
  parentId: string;
  phone: string;
  servicingBank: string;
  shortName: string;
  webPage: string;
}

export interface CommentEntityProps extends EntityOwnerProps {
  _links: {
    self: {
      href: string;
    };
  };
  commentText: string;
  creationDate: string;
  entityId: string;
  entityType: string;
  userProfileId?: string;
}

export interface TaskEntityProps extends EntityOwnerProps {
  clientId: string;
  creationDate: string;
  historyId: string;
  isActive: boolean;
  isDeleted: boolean;
  userProfileId: string;
  taskDescription: string;
  taskStatus: TaskStatusType;
  taskType: TaskTypeType;
  taskEndDate: string;
  format?: string;
  updateDate: string;
  parentId?: string;
  isOwner: {
    DELETE: boolean;
    UPDATE: boolean;
  };
  _links: object;
}
