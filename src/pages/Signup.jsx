import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { signup } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup1 = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const handleSubmit = async () => {
    if (name == "" && password == "" && phone == "") {
      toast.error("Vui lòng nhập đủ thông tin");
    }
    if (name !== "" && password !== "" && phone !== "") {
      await signup({
        name,
        password,
        phone: phone,
        roleId: 2,
      });
      navigate("/signin");
      toast.success("Đăng kí thành công");
    }
  };
  return (
    <Form className="container mt-5">
      <h2 className="mb-5 text-center">Đăng ký tài khoản</h2>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Nhập tài khoản</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Tài khoản"
        />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mật khẩu</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Nhập mật khẩu"
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Số điện thoại</Form.Label>
        <Form.Control
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Nhập số điện thoại"
        />
      </Form.Group>

      <Button onClick={handleSubmit} variant="primary" type="button">
        Đăng ký
      </Button>
    </Form>
  );
};

export default Signup1;
