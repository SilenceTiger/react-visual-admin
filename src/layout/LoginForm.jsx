import React, { useLayoutEffect } from "react"
import { Form, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useHistory } from "react-router-dom"
const LoginForm = () => {
  const history = useHistory()
  const onFinish = (params) => {
    if (params.username === "admin" && params.password === "123") {
      localStorage.setItem("LOGIN", "1")
      history.push("/")
    }
  }
  useLayoutEffect(() => {
    document
      .getElementById("login-form_username")
      .setAttribute("autocomplete", "off")
  }, [])
  return (
    <div className="login-form">
      <div className="title">React Visual Admin</div>
      <Form
        name="login-form"
        initialValues={{
          remember: false,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="login-icon" />} />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="login-icon" />} />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
            }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
