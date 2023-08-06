import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Homepage from "./pages/Homepage";
import Dasbord from "./pages/admin/Dasbord";
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
      <Route path="/admin" element={<Dasbord />} />
      <Route path="/" element={<Homepage />} />
      <Route
        path="/prod/:idProd"
        element={<ProductDetail products={products} categories={categories} />}
      />
    </Routes>
  );
};
export default App;
