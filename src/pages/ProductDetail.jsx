import { useParams } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import { red } from "@mui/material/colors";
const ProductDetail = ({ products, categories }) => {
  const { idProd } = useParams();
  const product = products.find((product) => product.id === +idProd);
  const category = product?.categoryId;

  const categoryProd = categories.find((c) => c.id === +category);
  return (
    <div style={{ marginLeft: 500 }}>
      <h2 style={{ fontSize: "50px" }}> Detail Product</h2>
      <h1 style={{ paddingRight: "100px" }}> Sản phẩm ${product?.name}</h1>
      <img
        style={{ borderRadius: 10 }}
        src={product?.image}
        alt={product?.name}
      />
      <h2>{categoryProd?.name}</h2>
      <h2 style={{ color: "red" }}>${product?.price}</h2>
      <h2>${product?.description}</h2>
    </div>
  );
};

export default ProductDetail;
