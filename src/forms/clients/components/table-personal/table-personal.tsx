import { bindActionCreators, Dispatch } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { Table } from "../../../../components";
import { ClientEntityProps, formConfig } from "../../../../constants";
import { getFiteredEntityArray } from "../../../../utils";
import { setClients } from "../../../../__data__";
import { State } from "../../../../__data__/interfaces";

const { COLUMNS, TABLES } = formConfig.clients;

interface ClientsProps {
  extraHeader: JSX.Element;
  clients: ClientEntityProps[];
  setClients: (clients: ClientEntityProps[]) => void;
}

export const TablePersonal = ({
  clients,
  extraHeader,
  setClients,
}: ClientsProps) => {
  const handleDelete = useCallback(
    (id) => {
      setClients(getFiteredEntityArray(id, clients));
    },
    [clients]
  );

  return (
    <Table
      _links={TABLES[0]._links}
      extraHeader={extraHeader}
      columns={COLUMNS}
      onDeleteRow={handleDelete}
      dataSource={clients}
      withSearch
    />
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.data?.clients ?? [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ setClients }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TablePersonal);
