import instance from "./instance";

export const updateUser = (id, data) => {
  const url = `/users/${id}`;
  return instance.put(url, data);
};

export const getOneUser = (id) => {
  const url = `/users/${id}`;
  return instance.get(url);
};

export const listUsers = () => {
  const url = `/users/`;
  return instance.get(url);
};

export const createUser = (data) => {
  const url = `/users/`;
  return instance.post(url, data);
};
