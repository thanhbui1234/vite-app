import instance from "./instance";

export const signup = (data) => {
  const url = `/users`;
  return instance.post(url, data);
};

export const getAllUser = () => {
  const url = `/users`;
  return instance.get(url);
};
