import {
  HomeOutlined,
  CodepenOutlined,
  DeploymentUnitOutlined,
  PieChartOutlined,
  DotChartOutlined,
} from "@ant-design/icons"
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
      {
        name: "VRM Loader",
        key: "/three/start/vrmloader",
      },
    ],
  },
  {
    name: "Game",
    key: "/game",
    icon: DeploymentUnitOutlined,
    subMenu: [
      {
        name: "Snake",
        key: "/game/snake",
      },
    ],
  },
  {
    name: "Echarts",
    key: "/echarts",
    icon: PieChartOutlined,
    subMenu: [
      {
        name: "Liquid Fill",
        key: "/echarts/liquidfill",
      },
    ],
  },
  {
    name: "D3",
    key: "/d3",
    icon: DotChartOutlined,
    subMenu: [
      {
        name: "Ellipse Rotaion",
        key: "/d3/ellipseRotaion",
      },
      {
        name: "2D three stars",
        key: "/d3/threeStars",
      },
      {
        name: "Custom Force",
        key: "/d3/customForce",
      },
      {
        name: "Force Graph",
        key: "/d3/forceGraph",
      },
    ],
  },
]
