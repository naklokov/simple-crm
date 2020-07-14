import Cookies from "js-cookie";

export const storeRememberMeParams = () => {
  const rememberMe = Cookies.get("rememberMe");
  const username = Cookies.get("username");
  if (rememberMe && username) {
    localStorage.setItem("rememberMe", rememberMe);
    localStorage.setItem("username", username);
  }
};

// TODO исправить на корректный тип у history
export const getPrevUrl = (history: any) =>
  history?.location?.state?.from?.pathname ?? "/";
