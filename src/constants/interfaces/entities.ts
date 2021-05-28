export type TaskStatusType = "COMPLETED" | "NOT_COMPLETED" | "ACTIVE";

export type TaskTypeType = "CALL";

export type LinksType = {
  [key: string]: {
    href: string;
  };
};

export interface EntityOwnerProps {
  id: string;
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
  departmentId?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  avatar?: string;
  location?: string;
  login?: string;
  position?: string;
  userRoleId?: string;
  isLocked?: boolean;
}

export interface PositionsEntityProps {
  cost: number;
  costPrice: number;
  currency: string;
  estimatedItemId: string;
  itemId: string;
  note: string;
  positionDescription: string;
  positionName: string;
  positionUnit: string;
  priceListId: string;
}

export interface ClientEntityProps extends EntityOwnerProps {
  activityField: string;
  address: string;
  businessId: string;
  checkingAccount: string;
  city: string;
  clientId: string;
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
  clientId: string;
  entityType: string;
  userProfileId?: string;
}

export interface ContactEntityProps extends EntityOwnerProps {
  fullName: string;
  clientId: string;
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

export interface TemplateEntityProps extends EntityOwnerProps {
  creationDate: string;
  departmentId: string;
  fileId: string;
  fileExtension: string;
  linkedEntityType: string;
  templateDescription: string;
  templateName: string;
}

export interface DepartmentEntityProps extends EntityOwnerProps {
  administratorId: string;
  creationDate: string;
  departmentHierarchy: string;
  departmentName: string;
  children?: DepartmentEntityProps[];
}
