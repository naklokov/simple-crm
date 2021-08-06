import { ProfileInfoEntityProps } from "../../constants";

export const initJivoScript = () => {
  const script = document.createElement("script");
  script.src = "//code-ya.jivosite.com/widget/nAFDp5SZzW";
  script.async = true;
  document.body.appendChild(script);
};

export const setJivoChatVisibility = (visibility: "hidden" | "visible") => {
  const jivoContainer: HTMLElement | null = document.getElementById("jcont");
  if (jivoContainer) jivoContainer.style.visibility = visibility;
};

export const setJivoUserInfo = (userInfo: ProfileInfoEntityProps) => {
  jivo_api.setCustomData([
    {
      title: "Информация о браузере",
      content: navigator.userAgent,
    },
  ]);

  jivo_api.setContactInfo({
    name: userInfo.fullName,
    phone: userInfo.phone,
    email: userInfo.email,
  });
};
