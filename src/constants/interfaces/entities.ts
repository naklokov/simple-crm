export type TaskStatusType = "COMPLETED" | "NOT_COMPLETED" | "ACTIVE";

export type TaskTypeType = "CALL";

export type LinksType = {
  [key: string]: {
    href: string;
  };
};

export interface EntityOwnerProps {
  id: string;
  clientId: string;
  historyId: string;
  isActive: boolean;
  isDeleted: boolean;
  updateDate: string;
  isOwner: {
    DELETE: boolean;
    UPDATE: boolean;
  };
  _links: LinksType;
}

export interface UseFormProps<T> {
  values: T;
  update: (data: T) => void;
  clear: () => void;
}

export interface ProfileInfoEntityProps {
  id?: string;
  clientId?: string;
  historyId?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  updateDate?: string;
  isOwner?: {
    DELETE: boolean;
    UPDATE: boolean;
  };
  _links?: LinksType;
  aboutMe?: string;
  birthDate?: string;
  businessId?: string;
  creationDate?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
  location?: string;
  login?: string;
  position?: string;
  userRoleId?: string;
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
  commentText: string;
  creationDate: string;
  entityId: string;
  entityType: string;
  userProfileId?: string;
}

export interface ContactEntityProps extends EntityOwnerProps {
  fullName: string;
  phone: string;
}

export interface TaskEntityProps extends EntityOwnerProps {
  clientId: string;
  creationDate: string;
  userProfileId: string;
  taskDescription: string;
  taskStatus: TaskStatusType;
  taskType: TaskTypeType;
  taskEndDate: string;
  format?: string;
  updateDate: string;
  parentId?: string;
}
