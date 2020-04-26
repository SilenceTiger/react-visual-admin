import React from "react"
import ReactEcharts from "echarts-for-react"
import echarts from "echarts"
import "echarts-gl"
import world from "../assets/mapData/world.json"
echarts.registerMap("world", world)
const LoginBackground = () => {
  const canvas = document.createElement("canvas")
  const mapChart = echarts.init(canvas, null, {
    width: 4096,
    height: 2048,
  })
  const mapOption = {
    geo: {
      map: "world",
      label: {
        fontSize: 40,
      },
      itemStyle: {
        areaColor: "transparent",
        borderColor: "#00FDFF",
      },
      emphasis: {
        label: {
          color: "#ffffff",
        },
        itemStyle: {
          areaColor: "#e33e33",
        },
      },
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      boundingCoords: [
        [-180, 90],
        [180, -90],
      ],
    },
  }
  mapChart.setOption(mapOption)
  const option = {
    globe: {
      globeRadius: 80,
      baseTexture: require("../assets/images/earth.jpg"),
      heightTexture: require("../assets/images/earth-high.jpg"),
      environment: require("../assets/images/universe.jpg"),
      displacementScale: 0.1,
      shading: "lambert",
      light: {
        ambient: {
          color: "#fff",
          intensity: 0.6,
        },
        main: {
          intensity: 0.6,
          shadow: true,
        },
      },
      layers: [
        {
          type: "blend",
          texture: mapChart,
        },
      ],
    },
    series: [],
  }
  return <ReactEcharts className="login-background" option={option} />
}

export default LoginBackground
