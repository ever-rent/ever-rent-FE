import { Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import { Login } from "../pages/auth/Login";
import { Join } from "../pages/auth/Join";
import { AddProduct } from "../pages/AddProduct";
import { ProductDetail } from "../pages/ProductDetail";
import { EditProduct } from "../pages/EditProduct";
import { CategoryDetail } from "../pages/CategoryDetail";
import { EditUserInfo } from "../pages/EditUserInfo";
import { MyPage } from "../pages/MyPage";
import { SearchItems } from "../components/searchItems/SearchItems";
import { ChatRoomList } from "../pages/chat/ChatRoomList";
import { ChatRoom } from "../pages/chat/ChatRoom";
import { ForgotPw } from "../pages/auth/ForgotPw";
import { OAuth } from "../pages/auth/OAuth";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth/google/callback" element={<OAuth />} />
      <Route path="/join" element={<Join />} />
      <Route path="/forgotPw" element={<ForgotPw />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/editProduct/:id" element={<EditProduct />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/categoryDetail/:id" element={<CategoryDetail />} />
      <Route path="/searchItems/:id" element={<SearchItems />} />
      <Route path="/editUserInfo/:id" element={<EditUserInfo />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/chatRoomList" element={<ChatRoomList />} />
      <Route path="/chat/room/:productId/:roomId" element={<ChatRoom />} />
    </Routes>
  );
};
