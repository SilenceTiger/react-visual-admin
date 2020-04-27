import React from "react"
import echarts from "echarts"
import "echarts-gl"
import world from "../assets/mapData/world.json"
echarts.registerMap("world", world)

class LoginBackground extends React.Component {
  constructor(props) {
    super(props)
    this.chart = null
  }
  componentDidMount() {
    this.chart = echarts.init(this.refs.chart)
    window.addEventListener("resize", this.resize.bind(this))
    this.initChart()
  }

  resize() {
    this.chart && this.chart.resize()
  }

  componentWillUnmount() {
    this.chart.dispose()
    window.removeEventListener("resize", this.resize)
  }

  initChart() {
    const canvas = document.createElement("canvas")
    const mapChart = echarts.init(canvas, null, {
      width: 2048,
      height: 1024,
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
    this.chart.setOption(option)
  }

  render() {
    return <div className="login-background" ref="chart"></div>
  }
}

export default LoginBackground
