import { Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import { Login } from "../pages/Login";
import { Join } from "../pages/Join";
import { AddProduct } from "../pages/AddProduct";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/addProduct" element={<AddProduct />} />
    </Routes>
  );
};
