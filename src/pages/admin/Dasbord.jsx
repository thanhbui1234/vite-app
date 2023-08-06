import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";

const Dasbord = () => {
  const [products, setPrudct] = useState([]);
  const handleDelete = (id) => {
    console.log(id);
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/products/`).then(({ data }) => {
      setPrudct(data);
    });
  }, []);

  return (
    <div>
      <table style={{ border: 1, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Description</th>
            <th>categoryId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dasbord;
