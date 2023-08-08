import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { update, updatePro } from "../../api/product";
import { getAllCategory } from "../../api/category";

const UpdateProd = () => {
  const { idUpd } = useParams();

  console.log(idUpd);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [checkCategoryId, setCheckCategoryId] = useState("");
  console.log(checkCategoryId);
  const [categories, setCategories] = useState([]);
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
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if (idUpd) {
      const { data } = await update(idUpd);
      setName(data.name);
      setPrice(data.price);
      setImage(data.image);
      setDescription(data.description);
      setCheckCategoryId(data.categoryId);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const { data } = await getAllCategory();
    setCategories(data);
  };
  const navigate = useNavigate();

  // const [valueInput, seTValueInput] = useState(product.name);
  // console.log(valueInput);

  const updateProduct = async () => {
    const data = {
      name,
      price,
      image,
      description,
      categoryId: checkCategoryId,
    };
    await updatePro(idUpd, data);
    navigate(-1);
    Toast.fire({
      icon: "success",
      title: "Cap nhat thanh cong",
    });
  };
  return (
    <div style={{ marginLeft: "200px", width: "1200px" }}>
      <>
        <h2>Update PRODUCT</h2>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="formFileMultiple" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
          />
        </Form.Group>
        <Form.Group controlId="formFileDisabled" className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
          />
        </Form.Group>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>CategoryId</Form.Label>
          <Form.Select>
            {categories.map((category) => {
              return (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Button onClick={updateProduct} variant="outline-success">
          Success
        </Button>{" "}
      </>
    </div>
  );
};

export default UpdateProd;
