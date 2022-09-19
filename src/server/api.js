import { auth } from "./core/instance";

export const productAPI = {
  getProducts: auth.get(`/products`),
  addProduct: (data) => auth.post(`/products`, data),
  getProductDetail: (productId) => auth.get(`/products/${productId}`),
  updateProduct: (data) => auth.put(`/products/${data.productId}`, data),
  deleteProduct: (productId) => auth.delete(`/products/${productId}`),
};

export const categoryAPI = {};

export const userAPI = {};
