import { HomeOutlined, SettingFilled } from "@ant-design/icons"

export default [
  {
    name: "Home",
    key: "/",
    icon: HomeOutlined,
  },
  {
    name: "Test Function", //后面删除
    key: "/test",
    icon: SettingFilled,
    subMenu: [
      {
        name: "Test1",
        key: "/test/1",
      },
      {
        name: "Test2",
        key: "/test2/2",
        subMenu: [
          {
            name: "Test3",
            key: "/test3/3",
          },
        ],
      },
    ],
  },
  {
    name: "Echarts",
    key: "/echarts",
    icon: SettingFilled,
    subMenu: [
      {
        name: "Earth",
        key: "/echarts/earth",
      },
    ],
  },
  {
    name: "ThreeJs",
    key: "/three",
    icon: SettingFilled,
    subMenu: [
      {
        name: "Three",
        key: "/three/introduce",
      },
    ],
  },
]
