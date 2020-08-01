export interface PersistState {
  permissions: string[];
  loading: boolean;
  menuCollapsed: boolean;
  profileInfo: ProfileInfoProps;
}

export interface State {
  persist: PersistState;
}

export interface ProfileInfoProps {
  id?: string;
  aboutMe?: string;
  birthDate?: string;
  businessId?: string;
  creationDate?: string;
  email?: string;
  firstName?: string;
  secondName?: string;
  lastName?: string;
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
