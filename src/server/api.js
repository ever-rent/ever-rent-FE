import { base } from "./core/instance";
import { auth } from "./core/instance";

export const productAPI = {
  getProducts: auth.get(`/products`),
  getCategory: (categoryId) => base.get(`/categories/${categoryId}`),
  addProduct: (data) => auth.post(`/auth/products`, data),
  getProductDetail: (productId) => auth.get(`auth/products/${productId}`),
  updateProduct: (data, productId) =>
    auth.put(`auth/products/${productId}`, data),
  deleteProduct: (productId) => auth.delete(`auth/products/${productId}`),
};

export const userAPI = {};
