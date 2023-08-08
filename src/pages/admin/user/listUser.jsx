import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { listUsers } from "../../../api/user";
import { toast } from "react-toastify";

const ListUser = () => {
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
    swalWithBootstrapButtons
      .fire({
        title: "Bạn chắc chứ?",
        text: "Sẽ xóa sản phẩm này!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Xóa!",
        cancelButtonText: "Hủy!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:3000/users/${id}`)
            .then(() => getAllProducts())
            .then(toast.success("Xoá thành công!"));
        }
      });
  };

  const getAllProducts = async () => {
    const { data } = await listUsers();
    console.log(data);
    setPrudct(data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <h1 className="text-center my-3">Quản lý Users</h1>
      <Button
        style={{ marginLeft: "970px" }}
        size="lg"
        className="mb-3 mt-5"
        variant="dark"
        onClick={() => navigate("/admin/user/add")}
      >
        Thêm user
      </Button>
      <table
        className="table shadow p-3 table-bordered"
        style={{
          border: 1,
          borderCollapse: "collapse",
          width: "600px",
          margin: "auto",
        }}
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Vai trò</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.role == 1 ? "ADMIN" : "USER"}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    DELETE
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => navigate(`/admin/user/edit/${product.id}`)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
