import React, { useContext, useMemo } from "react"
import { Breadcrumb } from "antd"
import { useLocation } from "react-router"
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons"
import { LayoutContext } from "./PrimaryLayout"
import menuTree from "./menuTree"

const assembleTree = (menus, parent) => {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i]
    let subMenus = menu.subMenu,
      path = parent ? parent + "-" + menu.name : menu.name
    menu.path = path
    subMenus && assembleTree(subMenus, path)
  }
}

const getMenuByPath = (menus, path) => {
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i]
    if (menu.key === path) {
      return menu
    }
    let subMenus = menu.subMenu
    if (subMenus && (menu = getMenuByPath(subMenus, path))) {
      return menu
    }
  }
}

assembleTree(menuTree, null)

const PrimaryLayout = () => {
  const layoutContext = useContext(LayoutContext)
  const location = useLocation()
  const breadRoute = useMemo(() => {
    const targetMenu = getMenuByPath(menuTree, location.pathname)
    return targetMenu.path ? targetMenu.path.split("-") : []
  }, [location.pathname])
  return (
    <div className="primary-header">
      {React.createElement(
        layoutContext.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: "trigger",
          onClick: () => {
            layoutContext.toggleCollapse(!layoutContext.collapsed)
          },
        }
      )}
      <Breadcrumb>
        {breadRoute.map((name, index) => {
          return <Breadcrumb.Item key={index}>{name}</Breadcrumb.Item>
        })}
      </Breadcrumb>
    </div>
  )
}

export default PrimaryLayout
