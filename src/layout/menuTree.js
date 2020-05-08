import { HomeOutlined, CodepenOutlined } from "@ant-design/icons"
export default [
  {
    name: "Home",
    key: "/",
    icon: HomeOutlined,
  },
  {
    name: "Three Begin",
    key: "/three",
    icon: CodepenOutlined,
    subMenu: [
      {
        name: "Geometry",
        key: "/three/start/introduce",
      },
      {
        name: "Simple Earth",
        key: "/three/start/simpleEarth",
      },
      {
        name: "Three Star",
        key: "/three/start/threeStar",
      },
      {
        name: "UV Mapping",
        key: "/three/start/uvMapping",
      },
      {
        name: "Magic Cube",
        key: "/three/start/magicCube",
      },
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
