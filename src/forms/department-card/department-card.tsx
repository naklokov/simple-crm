import React, { useEffect, useMemo } from "react";
import axios from "axios";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";
import {
  DepartmentEntityProps,
  formConfig,
  FORM_NAMES,
  PERMISSIONS,
  QueryProps,
  urls,
} from "../../constants";
import { FormWrapper, PagePermissionsChecker } from "../../wrappers";
import { Header, Information, Staff, Clients } from "./components";
import {
  useTabs,
  getFullUrl,
  defaultErrorHandler,
  fillLinks,
  useFormValues,
} from "../../utils";
import { setFormLoading } from "../../__data__";

const {
  FORM: { tabs, drawers: formDrawers },
} = formConfig.departmentCard;

const formName = FORM_NAMES.DEPARTMENT_CARD;

const formsMap: {
  [key: string]: (props: any) => any;
} = {
  staff: Staff,
  clients: Clients,
  information: Information,
};

export const DepartmentCard = () => {
  const { activeTab, onChange } = useTabs(tabs, "replace");
  const { id: departmentId } = useParams<QueryProps>();

  const FormComponent = useMemo(() => formsMap?.[activeTab.tabCode] ?? null, [
    activeTab.tabCode,
  ]);

  const [, setDepartment] = useFormValues<DepartmentEntityProps>(
    FORM_NAMES.DEPARTMENT_CARD
  );

  useEffect(() => {
    const fetchDepartment = async () => {
      setFormLoading({ name: formName, loading: true });
      try {
        const url = getFullUrl(urls.departments.entity, departmentId);
        const response = await axios.get(url);
        setDepartment(response?.data);
      } catch (error) {
        defaultErrorHandler({ error });
      } finally {
        setFormLoading({ name: formName, loading: false });
      }
    };

    fetchDepartment();

    return () => {
      setDepartment();
    };
  }, [departmentId, setDepartment]);

  const formDepartmentKey = `${activeTab?.tabCode}-${departmentId}`;

  return (
    <PagePermissionsChecker
      availablePermissions={[PERMISSIONS.DEPARTMENTS["GET.ALL"]]}
    >
      <>
        <Header
          footer={
            <Tabs onChange={onChange} activeKey={activeTab.tabCode}>
              {tabs.map(({ tabName, tabCode }) => (
                <Tabs.TabPane tab={tabName} key={tabCode} />
              ))}
            </Tabs>
          }
        />
        {activeTab && (
          <FormWrapper name={formName}>
            <FormComponent
              key={formDepartmentKey}
              tab={{
                ...activeTab,
                _links: fillLinks(activeTab._links, { departmentId }),
              }}
              drawers={formDrawers}
            />
          </FormWrapper>
        )}
      </>
    </PagePermissionsChecker>
  );
};
export default DepartmentCard;
