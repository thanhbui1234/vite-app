import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Dasbord = () => {
  const navigate = useNavigate();
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const [products, setPrudct] = useState([]);
  const handleDelete = (id) => {
    console.log(id);
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:3000/products/${id}`)
            .then(() => navigate("/admin"));
        }
      });
  };
  useEffect(() => {
    axios.get(`http://localhost:3000/products/`).then(({ data }) => {
      setPrudct(data);
    });
  }, []);

  return (
    <div style={{ marginLeft: 200 }}>
      <h1>Dasbord</h1>
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
        <tbody style={{ gap: 30 }}>
          {products.map((product, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    style={{ width: 100, borderRadius: 10 }}
                    src={product.image}
                    alt={product.name}
                  />
                </td>
                <td>{product.description}</td>
                <td>{product.categoryId}</td>
                <td>
                  <button onClick={() => handleDelete(product.id)}>
                    DELETE
                  </button>
                  <button>Update</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dasbord;
