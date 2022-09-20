import { auth } from "./core/instance";

export const productAPI = {
  getProducts: auth.get(`/products`),
  addProduct: (data) => auth.post(`/auth/products`, data),
  getProductDetail: (productId) => auth.get(`auth/products/${productId}`),
  updateProduct: (data, productId) =>
    auth.put(`auth/products/${productId}`, data),
  deleteProduct: (productId) => auth.delete(`auth/products/${productId}`),
};

export const categoryAPI = {};

export const userAPI = {};
