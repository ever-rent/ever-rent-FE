import { base } from "./core/instance";
import { auth } from "./core/instance";
import { profile } from "./core/instance";

export const productAPI = {
  getProducts: () => base.get(`/products`),
  getCategory: (categoryId) => base.get(`/categories/${categoryId}`),
  addProduct: (data) => profile.post(`/products`, data),
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
  postRent: (data, productId) => profile.post(`/orders/${productId}`, data),
  postLike: (productId) => profile.post(`/products/wishlists/${productId}`),
  getMyInfo: () => profile.get(`/mypages/myinfos`),
  getWishList: () => profile.get(`/mypages/myWishs`),
};

export const userAPI = {};

// imgUrlArray firstString
// env 설정 예정
export const imgFirstString =
  "https://davidsone.s3.ap-northeast-2.amazonaws.com/";
