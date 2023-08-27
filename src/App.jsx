import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Homepage from "./pages/Homepage";
import Dasbord from "./pages/admin/Dasbord";
import AddProd from "./pages/admin/addProd";
import UpdateProd from "./pages/admin/UpdateProd";
import Signin from "./pages/Signin";
import Signup1 from "./pages/Signup";
import NavBarAdmin from "./components/NavBarAdmin";
import ListUser from "./pages/admin/user/listUser";
import AddUser from "./pages/admin/user/AddUser";
import EditUser from "./pages/admin/user/EditUser";
import ListCategory from "./pages/admin/category/ListCategory";
import AddCategory from "./pages/admin/category/AddCategory";
import EditCategory from "./pages/admin/category/EditCategory";
const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/`)
      .then(({ data }) => setProducts(data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/categories/`)
      .then(({ data }) => setCategories(data));
  }, []);
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup1 />} />
      <Route path="/admin/update/:idUpd" element={<UpdateProd />} />
      <Route
        path="prod/:idProd"
        element={<ProductDetail products={products} categories={categories} />}
      />
      <Route path="/" element={<Homepage />} />
      <Route path="/admin" element={<NavBarAdmin />}>
        <Route index element={<Dasbord />} />
        <Route path="users" element={<ListUser />} />
        <Route path="user/add" element={<AddUser />} />
        <Route path="user/edit/:id" element={<EditUser />} />
        <Route path="add" element={<AddProd />} />
        <Route path="categories" element={<ListCategory />} />
        <Route path="categories/add" element={<AddCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
      </Route>
    </Routes>
  );
};
export default App;
