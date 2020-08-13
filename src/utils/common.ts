import { urls } from "../constants";
import axios from "axios";
import Cookies from "js-cookie";
import { logger } from ".";
import { COOKIES } from "../constants/http";
import { Dispatch } from "@reduxjs/toolkit";
import { setAuth } from "../__data__";

export const checkAuthCookie = () =>
  !!Cookies.get(COOKIES.USERNAME) && !!Cookies.get(COOKIES.JSESSIONID);

export const logout = async (dispatch: Dispatch) => {
  const username = Cookies.get(COOKIES.USERNAME);
  Cookies.remove(COOKIES.USERNAME);
  Cookies.remove(COOKIES.JSESSIONID);
  Cookies.remove(COOKIES.REMEMBER_ME);
  localStorage.clear();

  try {
    dispatch(setAuth(false));
    await axios.get(urls.login.logout);
    logger.debug({ message: "Пользователь вышел из системы", username });
    window.location.replace("/");
  } catch (error) {
    logger.error({
      message: "Произошла ошибка в процессе выхода из системы",
      username,
    });
  }
};
