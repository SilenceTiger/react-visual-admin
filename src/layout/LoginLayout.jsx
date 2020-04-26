import React from "react"
import LoginForm from "./LoginForm"
import LoginBackground from "./LoginBackground"
import "./layout.less"

export const LayoutContext = React.createContext()

const LoginLayout = () => {
  window.location.hash = "/login"
  return (
    <div className="login-layout">
      <LoginBackground />
      <LoginForm />
    </div>
  )
}

export default LoginLayout
