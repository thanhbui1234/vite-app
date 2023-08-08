import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCategory, updateCategory } from "../../../api/category";

const EditCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const getUserUpdate = async () => {
    const { data } = await getOneCategory(id);
    setName(data.name);
  };

  useEffect(() => {
    getUserUpdate();
  }, [id]);

  const handleSubmit = async () => {
    if (name == "") {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (name !== "") {
      await updateCategory(id, {
        name: name,
      });
      navigate("/admin/categories");
      toast.success("Cập nhật danh mục thành công!");
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

export default EditCategory;
