import { base } from "./core/instance";
import { auth } from "./core/instance";

export const productAPI = {
  getProducts: base.get(`/products`),
  getCategory: (categoryId) => base.get(`/category${categoryId}`),
  getProductDetail: (productId) => base.get(`/products/${productId}`),

  addProduct: (data) => auth.post(`/products`, data),
  updateProduct: (data) => auth.put(`/products/${data.productId}`, data),
  deleteProduct: (productId) => auth.delete(`/products/${productId}`),
};

export const userAPI = {};
