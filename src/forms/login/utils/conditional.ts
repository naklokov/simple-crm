import Cookies from "js-cookie";
import { http, urls } from "../../../constants";
import { History } from "history";

const { COOKIES } = http;

interface PathnameState {
  from: {
    pathname: string;
  };
}

export const storeRememberMeParams = () => {
  const rememberMe = Cookies.get(COOKIES.REMEMBER_ME);
  const username = Cookies.get(COOKIES.USERNAME);
  if (rememberMe && username) {
    localStorage.setItem(COOKIES.REMEMBER_ME, rememberMe);
    localStorage.setItem(COOKIES.USERNAME, username);
  }
};

export const getPrevUrl = (history: History<PathnameState>) =>
  history?.location?.state?.from?.pathname ?? urls.main.path;
