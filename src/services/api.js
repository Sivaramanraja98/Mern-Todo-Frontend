import axios from "axios";
import { LOGIN, REGISTER, CREATE, TODOLIST, DELETETODO, MARKTODO } from "./apiConstants";

export const login = async (data) => {
  return axios.post(LOGIN, data);
};

export const register = async (data) => {
  return axios.post(REGISTER, data);
};

export const create = async (data) => {
  let token = getToken();
  return axios.post(CREATE, data, { headers: { auth: token } });
};

export const getTodoList = async (data) => {
    let token = getToken();
    return axios.get(TODOLIST,  { headers: { auth: token } });
  };

  export const Delete = async (data) => {
    let token = getToken();
    return axios.post(DELETETODO, data, { headers: { auth: token } });
  };

  export const Markcompleted = async (data) => {
    let token = getToken();
    return axios.put(MARKTODO, data, { headers: { auth: token } });
  };

export const getToken = () => {
  let user = localStorage.getItem("user");
  if (!user) return;
  const userObj = JSON.parse(user);
  return userObj.token;
};
