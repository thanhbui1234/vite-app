import instance from "./instance";

export const getAllCategory = () => {
  const url = `/categories`;
  return instance.get(url);
};

export const updateCategory = (id, data) => {
  const url = `/categories/${id}`;
  return instance.put(url, data);
};

export const getOneCategory = (id) => {
  const url = `/categories/${id}`;
  return instance.get(url);
};

export const createCategory = (data) => {
  const url = `/categories/`;
  return instance.post(url, data);
};
