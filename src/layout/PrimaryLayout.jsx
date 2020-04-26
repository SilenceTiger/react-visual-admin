import React, { useState, useEffect } from "react"
import { Layout } from "antd"
import { useHistory } from "react-router-dom"
import LoginLayout from "./LoginLayout"
import PrimaryMenu from "./PrimaryMenu"
import PrimaryHeader from "./PrimaryHeader"
import PrimaryContent from "./PrimaryContent"
import "./layout.less"

const { Sider } = Layout

export const LayoutContext = React.createContext()

const PrimaryLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }
  const history = useHistory()

  // 监听变化 否则react hook不会改变状态
  useEffect(() => {}, [history])

  if (!localStorage.getItem("LOGIN")) {
    return <LoginLayout />
  }
  return (
    <LayoutContext.Provider value={{ collapsed, toggleCollapse }}>
      <Layout className="primary-layout">
        <Sider
          className="primary-sider"
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <PrimaryMenu />
        </Sider>
        <Layout>
          <PrimaryHeader />
          <div className="primary-content">
            <PrimaryContent />
          </div>
        </Layout>
      </Layout>
    </LayoutContext.Provider>
  )
}

export default PrimaryLayout
