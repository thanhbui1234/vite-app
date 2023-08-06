import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";

const Homepage = () => {
  const tabs = ["products", "categories"];
  const [type, setType] = useState("products");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/${type}`)
      .then(({ data }) => setProducts(data));
  }, [type]);
  console.log(products);
  return (
    <div style={{ marginBottom: 500, marginLeft: 100 }}>
      <h1>Home page</h1>
      <div>
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          {tabs.map((tab) => {
            return (
              <button
                key={tab}
                onClick={() => setType(tab)}
                style={
                  type === tab ? { color: "#fff", background: "#333" } : {}
                }
              >
                {tab}
              </button>
            );
          })}
        </div>
        <div
          style={{
            gap: 50,
            display: "flex",
          }}
        >
          {products.map((product) => {
            return (
              <Link key={product.id} to={`/product/${product.id}`}>
                <h4>{product.name}</h4>
                <img
                  style={{
                    borderRadius: 10,
                  }}
                  src={product?.image || ""}
                  alt={product.name}
                />

                <p>{product.description}</p>
                <p>{product.price}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
