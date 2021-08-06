interface CustomDataProps {
  [key: string]: string;
}

interface JivoApiProps {
  open: () => { result: string };
  close: () => void;
  setUserToken: (token: string) => { result: string; token: string };
  setContactInfo: ({
    name,
    email,
    phone,
  }: {
    name?: string;
    email?: string;
    phone?: string;
  }) => void;
  setCustomData: (fields: CustomDataProps[]) => void;
}

declare interface Window {
  jivo_onOpen: () => void;
  jivo_onClose: () => void;
  jivo_api: JivoApiProps;
}

/* eslint-disable */
declare const jivo_api: JivoApiProps;
declare let jivo_onClose: () => void;
declare let jivo_onOpen: () => void;
