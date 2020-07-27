import Cookies from "js-cookie";
import { http } from "../../../constants";

const { COOKIES } = http;

export const storeRememberMeParams = () => {
  const rememberMe = Cookies.get(COOKIES.REMEMBER_ME);
  const username = Cookies.get(COOKIES.USERNAME);
  if (rememberMe && username) {
    localStorage.setItem(COOKIES.REMEMBER_ME, rememberMe);
    localStorage.setItem(COOKIES.USERNAME, username);
  }
};

// TODO исправить на корректный тип у history
export const getPrevUrl = (history: any) =>
  history?.location?.state?.from?.pathname ?? "/";
