import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/user.action";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/apiConstants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      const resData = await axios.post(`${baseUrl}/api/v1/user/login`, values);
      dispatch(loginAction(resData.data));

      navigate("/artist");
    } catch (error) {
      alert("Invalid user name or password");
    } finally {
      setIsLoading(false);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Row justify={"center"} style={{ height: "100vh" }} align="middle">
      <Col lg={6} md={8} sm={24}>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <h1>Login</h1>
          <Form.Item
            label="Email"
            name="email"
            style={{ width: "100%" }}
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default Login;
