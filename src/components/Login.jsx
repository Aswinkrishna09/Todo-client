import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
} from "antd";
import React, { useEffect, useState } from "react";
import { userLogin, userRegister } from "../API/apis";

const Login = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const onFinish = async (values) => {
    console.log("Success:", values);
    if (login) {
      const res = await userLogin(values);
      console.log(res);
      if (res.error == 1) {
        setError(res.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("");
        setModalOpen(false);
        window.location.reload()
      }
    } else {
      const res = await userRegister(values);
      if (res.error == 1) {
        setError(res.msg);
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("");
        setModalOpen(false);
        window.location.reload()
      }
    }
  };
  useEffect(() => {
    if(localStorage.getItem('token')){
      setModalOpen(false)
    }else{
      setModalOpen(true)
    }
  }, []);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Modal
      title={login ? `Login` : "Register"}
      style={{
        top: 20,
      }}
      closable={false}
      footer={false}
      open={modalOpen}
    >
      {error && <Alert message={error} type="error" />}
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {!login && (
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Badge
            onClick={() => setLogin(!login)}
            style={{ cursor: "pointer" }}
            status="processing"
            text={login ? `New User/Signup` : `Have an account? Login`}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 20,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default Login;
