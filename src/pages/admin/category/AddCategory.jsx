import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../api/category";

const AddCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (name == "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (name !== "") {
      await createCategory({
        name: name,
      });
      navigate("/admin/categories");
      toast.success("Thêm mới danh mục thành công!");
    }
  };
  return (
    <div>
      <h1 className="text-center mt-3">Thêm danh mục</h1>
      <Form style={{ width: "500px", margin: "auto", marginTop: "40px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Tên danh mục</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="tên danh mục cần tạo"
          />
        </Form.Group>
      </Form>
      <Button
        onClick={handleSubmit}
        className="mt-3"
        style={{ marginLeft: "925px" }}
      >
        Tạo danh mục
      </Button>
    </div>
  );
};

export default AddCategory;
