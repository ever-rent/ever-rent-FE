import { base } from "./core/instance";
import { auth } from "./core/instance";

export const productAPI = {
  getProducts: ()=> base.get(`/products`),
  getCategory: (categoryId) => base.get(`/categories/${categoryId}`),
  addProduct: (data) => auth.post(`/products`, data),
  getProductDetail: (productId) => base.get(`/products/${productId}`),
  updateProduct: (data, productId) =>
    auth.put(`/products/${productId}`, data),
  deleteProduct: (productId) => auth.delete(`/products/${productId}`),
};

export const userAPI = {};
