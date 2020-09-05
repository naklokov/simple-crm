import React from "react";
import { FormHeader } from "../../components/form-header";
import { useTranslation } from "react-i18next";
import { ClientEntityProps } from "../../constants";
import { connect } from "react-redux";
import { State } from "../../__data__/interfaces";
import { useParams } from "react-router";
import { getClient } from "./utils";

interface ClientCardHeaderProps {
  clients?: ClientEntityProps[];
}

export const ClientCardHeader = ({ clients }: ClientCardHeaderProps) => {
  const [t] = useTranslation("clientCard");
  const { id } = useParams();

  const client = getClient(id, clients);
  const title = client?.shortName ?? t("title.new");

  return (
    <React.Fragment>
      <FormHeader title={title} />
    </React.Fragment>
  );
};

const mapStateToProps = (state: State) => ({
  clients: state?.clients ?? [],
});

export default connect(mapStateToProps)(ClientCardHeader);
