import React, { Key, useCallback, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Tree } from "antd";
import { useDispatch } from "react-redux";
import {
  DepartmentEntityProps,
  FORM_NAMES,
  urls,
} from "../../../../../../../../constants";
import { closeMenuSubDrawer } from "../../../../../../../../__data__";
import { getFullUrl, useFormValues } from "../../../../../../../../utils";
import { getTreeData, getAllowDropMap, isAllowDrop } from "../../utils";
import { Skeleton } from "../../../../../../../../components";

interface DepartmentTreeProps {
  departments: DepartmentEntityProps[];
  expandedKeys: Key[];
  onExpand: (expandedKeys: Key[]) => void;
  loading?: boolean;
  searched?: string;
  onDrop: (
    dragNode: any,
    dragDepartment: DepartmentEntityProps,
    targetDepartment: DepartmentEntityProps
  ) => void;
}

export const DepartmentsTree: React.FC<DepartmentTreeProps> = ({
  departments,
  expandedKeys,
  searched = "",
  loading = false,
  onDrop,
  onExpand,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [dragDepartmentId, setDragDepartmentId] = useState("");

  const [selectedDepartment] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  const allowDropMap = useMemo(() => getAllowDropMap(departments), [
    departments,
  ]);

  const treeData = useMemo(() => {
    const sorted = departments.sort((a, b) =>
      a?.departmentName
        ?.toLowerCase()
        ?.localeCompare(b?.departmentName?.toLowerCase())
    );

    return getTreeData(sorted, searched);
  }, [searched, departments]);

  const handleDrop = useCallback(
    (info) => {
      const targetId: string = info?.node?.key;
      const target = departments.find(({ id }) => id === targetId);
      const current = departments.find(({ id }) => id === dragDepartmentId);

      if (current && target) {
        onDrop?.(info?.node, current, target);
      }
    },
    [dragDepartmentId, departments, onDrop]
  );

  const handleDragStart = useCallback((info) => {
    setDragDepartmentId(info?.node?.key);
  }, []);

  const handleDragEnd = useCallback((info) => {
    setDragDepartmentId("");
  }, []);

  const handleAllowDrop = useCallback(
    (allowDrop: any) => {
      const targetId: string = allowDrop?.dropNode?.key;
      return isAllowDrop(allowDropMap, targetId, dragDepartmentId);
    },
    [allowDropMap, dragDepartmentId]
  );

  const handleSelect = useCallback(
    (selectedKeys: Key[]) => {
      dispatch(closeMenuSubDrawer());

      const key = selectedKeys?.[0]?.toString();
      const url = getFullUrl(urls.departments.path, key);
      history.push(url);
    },
    [history, dispatch]
  );

  const renderLoading = () =>
    [...Array(5)].map((i) => (
      <p key={i}>
        <Skeleton.Input style={{ width: "200px" }} />
      </p>
    ));

  return (
    <div style={{ padding: "16px 24px" }}>
      {loading || !treeData.length ? (
        renderLoading()
      ) : (
        <Tree
          onSelect={handleSelect}
          expandedKeys={expandedKeys}
          onExpand={onExpand}
          treeData={treeData}
          selectedKeys={[selectedDepartment?.id]}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          allowDrop={handleAllowDrop}
          draggable
        />
      )}
    </div>
  );
};

export default DepartmentsTree;
