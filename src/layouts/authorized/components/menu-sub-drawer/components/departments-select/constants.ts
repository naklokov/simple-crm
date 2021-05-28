import { ReactNode } from "react";

export interface TreeDataProps {
  key: string;
  title: ReactNode;
  parentId?: string;
  children?: TreeDataProps[];
}
