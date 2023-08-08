import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

const Homepage = () => {
  const tabs = ["products", "categories"];
  const [type, setType] = useState("products");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/${type}`)
      .then(({ data }) => setProducts(data));
  }, [type]);
  console.log(products);
  return (
    <div style={{ marginBottom: 500, marginLeft: 100, marginTop: "10px" }}>
      <h1>Home page</h1>
      <h3 style={{ marginLeft: "1200px", display: "flex", gap: "5px" }}>
        <Button variant="dark" onClick={() => navigate("/signin")}>
          Đăng nhập
        </Button>
        <Button variant="dark" onClick={() => navigate("/signup")}>
          Đăng ký
        </Button>
      </h3>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
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
          className="mt-4"
          style={{
            gap: 50,
            display: "flex",
          }}
        >
          {products.map((product) => {
            return (
              <div
                style={{ cursor: "pointer" }}
                key={product.id}
                to={`/prod/${product.id}`}
                onClick={() => navigate(`/prod/${product.id}`)}
              >
                <h4>{product.name}</h4>
                {product.image && (
                  <img
                    style={{
                      borderRadius: 10,
                    }}
                    src={
                      product.image.length > 20
                        ? product.image
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJwAAAB1CAMAAACMLXg1AAAAWlBMVEXy8vJmZmbz8/P09PT4+PheXl7d3d15eXm1tbVRUVGNjY3v7+/8/PxhYWHs7OzW1tZZWVmAgIDDw8O7u7utra2kpKTMzMxycnLl5eWUlJSenp6Hh4dsbGxEREQ5qKgBAAAFAElEQVR4nO2ai5aqOgyGsQkXaWkpcq/n/V/ztDCoKIy1m+Jee/GvNaOj0HyT0DShBMHfK/JtgN90wLnqgHPVAeeqA85VB5yrDjhXHXCuOuBcdcC56oBz1QHnqgPOVf8QHNlAXuAAGGwiBFuj1nCIZXjeRFmJsDEclOdTvImueYnbwkF7PYmA2v4r66KBOF1bO7PWcFGYIpnPiMDizdNk0D+AaR7ZxfUTOFiz+dlkhTT0A7eFDjhX7QL3UbJ/HGoPOECGLnz+4QiCSMqixc9LB/9wQFWY5/mpsEz2e8IBv4Yno7PtUrQjHFYjm1a7bIggroTcNxzhzcQWJouuQ6gLwRYZfMNBNLGdsv4VjhBWZHmYx9ESuHe49gYXLsAFILLMfBfzBQrvYaX3sF6W4K7Z+GXH9ocLWJL/RPXKX4fAbpou+UKq8e65IOgGuiyrX61jcZvKS5PZu+cIQJWf83MjXlcw4He001Ci7gw3rF+RaBeSBUGZPdKV7MnGHgs/0Sv/0uk4XY4T3TPJ9+o5giI7zRU/GfkeHNDmGS7s2czM9+AeFt073XxGfw0O6/MLm6ajjzDfgjOt94KyeSm4Sw/xOhhLX4M6uO7ykO12anCeWxy85Its2ncP9ckueQ4pp7P0j9Gy3wxccz9yBziAJL7GFZAHO+o5i9yVlze6HRoclCaEubxXbKxaC+pw2d3yifeqhHA1hjD8oSM6i6wGdQws3wnOGJiMymCku9efK65L2S5wOqZ3L2VySLHQ/eo4rfNP4ekVjgCdgYSGjl3esZ2mwtMrHGD3VBRJQB6uz9TbcWoYwSccoHp2ku6ydC/43nN5xfzCEbJwcenIssIirrlAn3AE+6VslkndR/+W5n4Oi3Wv5g2O4NrSLrmN70wj6wsOoF8DsIxsWCDxBLcc04kOrCLL0Q8c635dPa0imyk/cEv9wcyuVWTzpPMA1/1adYx0aBPZJtscLsss1oCY2mRjD3BvbQ6+o/ie7ktwelboLufdoZvDtW8M3uji5H2223i/lQQvy/2aW94eFyq6LZx2XZaHmyjPVnYH3OF0u1Ukm6ggttuPH+xcmW2PTWRt8x96ImdnucER5zM/NuMgQBzuWT/cX2euO9frchyQVkJXdxdxywmEVkuZ9c94HcNKr7p/Z10N0xiEdq/Z609d6QqnZAusrzFgOOxFEGBg0oT+00TcvB2fAtDNoP7EMutuBVd3aODaVKWjyyoe9b3s6jS+ACZS/wYhVVUhVEqJz3fb/wQO41bDMVVjkZrJEUgqTi2kHeVX2saUN5Q1EfaKFT1GysmQK5yES2I8FxMIpNk4BMVFx1h5QZScC2Qx5xJBpCxtGessi6Rt4BSlsYZrFRJU2rKuWh7gAKMyo6JDiFImyySJxZ6eU5RVtYZLJzgyg+tULYMfuLgWQlgWSVvBQSurwXNET9w5HK1TxiSN0hHOOJK/H3Q7OEkB+6ZmDUUem3soM7gkQbwGQUNYrXQ21B9Z1r5bwRGM/qtZX7V9Oc5Wri9+Vmm4mIsmKvOapWUkUyakSLodU0lAzUWEdUug6Ie7qSQQtBUAURvod6gvx6hAllQ6HaKoEjc7rlUJmHIW9FqPAGOWgGFHB/SL+Qb056g4S3o0VYJ78eN64sq5ZHq0Di8ylcPy4WjFa1WGQWv/OPWCvMJ99iT6wvkbcXjRAeeqA85VB5yrDjhXHXCuOuBcRf4HUI5L04LVou4AAAAASUVORK5CYII="
                    }
                    alt={product.name}
                  />
                )}

                <p>{product.description}</p>
                <p>{product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
