import { HomeOutlined, CodepenOutlined } from "@ant-design/icons"
export default [
  {
    name: "Home",
    key: "/",
    icon: HomeOutlined,
  },
  {
    name: "Three Start",
    key: "/three",
    icon: CodepenOutlined,
    subMenu: [
      {
        name: "Introduce",
        key: "/three/start/introduce",
      },
      // {
      //   name: "Geometry",
      //   key: "/three/start/geometry",
      // },
    ],
  },
  // {
  //   name: "Echarts",
  //   key: "/echarts",
  //   icon: SettingFilled,
  //   subMenu: [
  //     {
  //       name: "Earth",
  //       key: "/echarts/earth",
  //     },
  //   ],
  // },
]
