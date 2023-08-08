import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAllUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Signin = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);

  const allUser = async () => {
    const { data } = await getAllUser();
    setData(data);
  };

  useEffect(() => {
    allUser();
  }, []);

  const handleSubmit = () => {
    const checkName = data.find((user) => user.name === name);
    if (name === "") {
      toast.error("Bạn chưa nhập tài khoản");
      return;
    }
    if (checkName === undefined) {
      toast.error("Bạn nhập sai tài khoản");
      return;
    }

    if (password === "") {
      toast.error("Bạn chưa nhập mật khẩu");
      return;
    }

    if (checkName) {
      const checkPassword = data.find((user) => user.password === password);
      console.log(checkPassword);
      if (checkPassword === undefined) {
        toast.error("Bạn đã nhập sai mật khẩu!");
      }
      if (checkPassword) {
        navigate("/");
        toast.success("Đăng nhập thành công!");
      }
    }
  };

  return (
    <Form className="container mt-5">
      <h2 className="mb-5 text-center">Đăng nhập</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Tên tài khoản</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Nhập tài khoản"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="button">
        Đăng nhập
      </Button>
    </Form>
  );
};

export default Signin;
