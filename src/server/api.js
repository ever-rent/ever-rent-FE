import { base } from "./core/instance";
import { auth } from "./core/instance";

export const productAPI = {
  getProducts: () => base.get(`/products`),
  getCategory: (categoryId) => base.get(`/categories/${categoryId}`),
  getSearch: (searchWord) => base.get(`/searchs?keyword=${searchWord}`),
  addProduct: (data) => auth.post(`/products`, data),
  getProductDetail: (productId) => base.get(`/products/${productId}`),
  updateProduct: (data, productId) => auth.put(`/products/${productId}`, data),
  deleteProduct: (productId) => auth.delete(`/auth/products/${productId}`),
  toggleWishProduct: (productId) =>
    auth.post(`/products/wishlists/${productId}`),
};

export const mypageAPI = {
  getMyPageList: () => auth.get(`/mypages/lists`),
  acceptOrder: (orderId) => auth.put(`/mypages/confirms/${orderId}`),
  getMyPagePending: () => auth.get(`/mypages/waitlists`),
  getMyPageConfirm: () => auth.get(`/mypages/confirms`),
  getMyPageExpired: () => auth.get(`/mypages/expired`),
  getBorrowList: () => auth.get(`/mypages/myrent`),
  postRent: (data, productId) => auth.post(`/orders/${productId}`, data),
  postLike: (productId) => auth.post(`/products/wishlists/${productId}`),
  getMyInfo: () => auth.get(`/mypages/myinfos`),
  getWishList: () => auth.get(`/mypages/myWishs`),
};

// imgUrlArray firstString
// env 설정 예정
export const imgFirstString =
  "https://davidsone.s3.ap-northeast-2.amazonaws.com/";
