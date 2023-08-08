import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { createUser } from "../../../api/user";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name == "" && password == "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (name !== "" && password !== "" && role !== 0) {
      await createUser({
        name: name,
        password: password,
        role: role,
      });
      navigate("/admin/users");
      toast.success("Thêm mới user thành công!");
    }
  };
  return (
    <div>
      <h1 className="text-center mt-3">Thêm mới user</h1>
      <Form style={{ width: "500px", margin: "auto" }}>
        <Form.Group className="mb-3">
          <Form.Label>Tên user</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="tên người cần tạo"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Tạo mật khẩu"
          />
        </Form.Group>
        <Form.Label>Vai trò</Form.Label>
        <Form.Select onChange={(e) => setRole(e.target.value)}>
          <option value={2}>User</option>
          <option value={1}>Admin</option>
        </Form.Select>
      </Form>
      <Button
        onClick={handleSubmit}
        className="mt-3"
        style={{ marginLeft: "965px" }}
      >
        Tạo user
      </Button>
    </div>
  );
};

export default AddUser;
