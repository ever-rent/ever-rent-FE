import { base } from "./core/instance";
import { auth } from "./core/instance";

export const productAPI = {
  getProducts: () => auth.get(`/products`),
  getCategory: (categoryId) => base.get(`/categories/${categoryId}`),
  getSearch: (searchWord) => base.get(`/searchs?keyword=${searchWord}`),
  addProduct: (data) => auth.post(`/products`, data),
  getProductDetail: (productId) => base.get(`/products/${productId}`),
  updateProduct: (data, productId) =>
    auth.put(`/auth/products/${productId}`, data),
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

export const chatAPI = {
  getChatRoomList: () => auth.get("/chat/rooms"),
  getChatMessage: (roomId) => auth.get(`/chat/message/${roomId}`),
  createChatRoom: (productId) => auth.post(`/create/chat/${productId}`),
  postOrderDate: (productId, data) => auth.post(`/orders/${productId}`, data),
};

export const imgFirstString = process.env.REACT_APP_IMG_URL;
