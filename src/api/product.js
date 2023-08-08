import instance from "./instance";

export const update = (id) => {
  const url = `/products/${id}`;
  return instance.get(url);
};

export const updatePro = (id, data) => {
  const url = `/products/${id}`;
  return instance.put(url, data);
};

export const listProduct = () => {
  const url = `/products/`;
  return instance.get(url);
};
