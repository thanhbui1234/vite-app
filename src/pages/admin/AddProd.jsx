import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import Swal from "sweetalert2";

const AddProd = () => {
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
    axios
      .get(`http://localhost:3000/categories`)
      .then(({ data }) => setCategories(data));
  }, []);
  console.log(categories);
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios
      .post(`http://localhost:3000/products`, values)
      .then(() => {
        navigate("/admin");
      })
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Thêm sản phẩm thành công",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h2>ADD PRODUCT</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="image"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="categoryId"
          name="categoryId"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Form.Item
          rules={[{ required: true, message: "Please input your Category!" }]}
          name="categoryId"
          label="Select"
        >
          <Select>
            {categories.map((category, index) => {
              return (
                <Select.Option key={index} value={category.id}>
                  {category.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProd;
