import React from "react"
import echarts from "echarts"
import "echarts-liquidfill"

class LiquidFill extends React.Component {
  constructor(props) {
    super(props)
    this.chart = null
  }
  componentDidMount() {
    this.chart = echarts.init(this.refs.chart)
    //window.onresize = this.resize.bind(this)
    this.initChart()
  }

  initChart() {
    const option = {
      backgroundColor: "#151934",
      series: [
        {
          type: "liquidFill",
          radius: "100%",
          //color: ["red", "yellow"],
          center: ["50%", "50%"],
          data: [0.4544, 0.4544],
          backgroundStyle: {
            borderWidth: 2,
            borderColor: "#1789fb",
            color: "#1c233f",
          },
          outline: {
            show: false,
            itemStyle: {
              borderWidth: 5,
              borderColor: "#1789fb",
              borderType: "dashed",
            },
          },
          itemStyle: {
            opacity: 0.95,
            shadowBlur: 50,
            shadowColor: "rgba(0, 0, 0, 0.4)",
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 1,
                  color: "rgba(58, 71, 212, 0)",
                },
                {
                  offset: 0.5,
                  color: "rgba(31, 222, 225, .2)",
                },
                {
                  offset: 0,
                  color: "rgba(31, 222, 225, 1)",
                },
              ],
              globalCoord: false,
            },
          },
          label: {
            show: false,
            normal: {
              //此处没有生效，本地生效
              textStyle: {
                fontSize: 20,
                color: "red",
              },
            },
          },
        },
      ],
    }
    this.chart.setOption(option)
  }

  render() {
    return (
      <div
        className="login-background"
        ref="chart"
        style={{
          width: "400px",
          height: "400px",
        }}
      ></div>
    )
  }
}

export default LiquidFill
