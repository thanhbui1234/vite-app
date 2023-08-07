import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

const AddProd = ({ addProduct }) => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState();
  const onHandleChange = (event) => {
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  };
  // const onHandleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(inputValues);
  //   addProduct(inputValues);
  //   navigate("/admin");
  // };
  const onFinish = (values) => {
    console.log({ values });
    addProduct(values);
    navigate("/admin");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      {/* <form action="" onSubmit={onHandleSubmit}>
        <input
          type="text"
          placeholder="Enter Product Name"
          onChange={onHandleChange}
          name="product"
        />
        <input
          type="text"
          placeholder="Enter Product Name"
          onChange={onHandleChange}
          name="price"
        />
        <button type="submit">Add New</button>
      </form> */}
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
          label="product"
          name="product"
          rules={[{ required: true, message: "Please input your product!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
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
