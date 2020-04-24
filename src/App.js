import React from "react"
import { Switch, HashRouter } from "react-router-dom"
import { ConfigProvider } from "antd"
import zhCN from "antd/es/locale/zh_CN"
import PrimaryLayout from "./layout/PrimaryLayout"

const App = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter basename="/">
        <Switch>
          <PrimaryLayout></PrimaryLayout>
        </Switch>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
