import { Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import { Login } from "../pages/Login";
import { Join } from "../pages/Join";
import { AddProduct } from "../pages/AddProduct";
import { ProductDetail } from "../pages/ProductDetail";
import { EditProduct } from "../pages/EditProduct";
import { CategoryDetail } from "../pages/CategoryDetail";
import { EditUserInfo } from "../pages/EditUserInfo";
import { MyPage } from "../pages/MyPage";
import { SearchItems } from "../components/searchItems/SearchItems";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/editProduct/:id" element={<EditProduct />} />
      <Route path="/productDetail/:id" element={<ProductDetail />} />
      <Route path="/categoryDetail/:id" element={<CategoryDetail />} />
      <Route path="/searchItems/:id" element={<SearchItems />} />
      <Route path="/editUserInfo/:id" element={<EditUserInfo />} />
      <Route path="/myPage" element={<MyPage />} />
    </Routes>
  );
};
