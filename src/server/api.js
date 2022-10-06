import { base } from "./core/instance";
import { auth } from "./core/instance";
import { profile } from "./core/instance";

export const productAPI = {
  getProducts: () => base.get(`/products`),
  getCategory: (categoryId) => base.get(`/categories/${categoryId}`),
  addProduct: (data) => auth.post(`/products`, data),
  getProductDetail: (productId) => base.get(`/products/${productId}`),
  updateProduct: (data, productId) => auth.put(`/products/${productId}`, data),
  deleteProduct: (productId) => auth.delete(`/products/${productId}`),
};

export const mypageAPI = {
  getMyPageList: () => profile.get(`/mypages/lists`),
  acceptOrder: (orderId) => profile.put(`/mypages/confirms/${orderId}`),
  getMyPagePending: () => profile.get(`/mypages/waitlists`),
  getMyPageConfirm: () => profile.get(`/mypages/confirms`),
  getMyPageExpired: () => profile.get(`/mypages/expired`),
  getBorrowList: () => profile.get(`/mypages/myrent`),
  postRent: (data, productId) => auth.post(`/orders/${productId}`, data),
};

export const userAPI = {};
