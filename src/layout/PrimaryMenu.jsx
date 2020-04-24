import React from "react"
import { Menu } from "antd"
import { useHistory } from "react-router-dom"
import menuTree from "./menuTree"

const transferTree = (menu) => {
  if (!menu.subMenu) {
    return (
      <Menu.Item key={menu.key}>
        {menu.icon && React.createElement(menu.icon)}
        <span>{menu.name}</span>
      </Menu.Item>
    )
  } else {
    const subMenuTitle = (
      <span>
        {menu.icon && React.createElement(menu.icon)}
        <span>{menu.name}</span>
      </span>
    )
    const subMenuArr = []
    menu.subMenu.forEach((childMenu) => {
      subMenuArr.push(transferTree(childMenu))
    })
    return (
      <Menu.SubMenu key={menu?.key} title={subMenuTitle}>
        {subMenuArr}
      </Menu.SubMenu>
    )
  }
}

const PrimaryMenu = () => {
  const history = useHistory()
  const Menus = menuTree.map((menu) => transferTree(menu))

  const changeRouter = (param) => {
    param.key && history.push(param.key)
  }

  return (
    <Menu
      onClick={changeRouter}
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["/"]}
    >
      {Menus}
    </Menu>
  )
}

export default PrimaryMenu
