import { Button, Collapse, Result, Typography } from "antd";
import React, { ReactNode } from "react";
import { withTranslation } from "react-i18next";
import { defaultErrorHandler } from "../utils";

const { Paragraph, Text } = Typography;

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  callStack: any;
}

interface ErrorBoundaryProps {
  t: any;
  i18n: any;
  tReady: any;
  children: ReactNode;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, errorMessage: "", callStack: "" };
  }

  handleClick = () => {
    window.location.replace("/");
  };

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    this.setState({ errorMessage: error.message });
    this.setState({ callStack: error.stack });
    defaultErrorHandler({ error: { errorMessage: error.message } });
  }

  render() {
    const { t } = this.props;
    const { hasError, callStack, errorMessage } = this.state;

    if (hasError) {
      return (
        <Result
          status="error"
          title={t("front.title")}
          subTitle={t("front.subtitle")}
          extra={[
            <Button key="goMain" type="primary" onClick={this.handleClick}>
              {t("button")}
            </Button>,
          ]}
        >
          {callStack && (
            <div className="desc">
              <Paragraph key="following">
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  {t("front.following.error")}
                </Text>
              </Paragraph>

              <Collapse ghost>
                <Collapse.Panel header={t("expand.title")} key="1">
                  <Paragraph strong>{errorMessage}</Paragraph>
                  <Paragraph>{callStack}</Paragraph>
                </Collapse.Panel>
              </Collapse>
            </div>
          )}
        </Result>
      );
    }

    return this.props.children;
  }
}

export default withTranslation("error")(ErrorBoundary);
