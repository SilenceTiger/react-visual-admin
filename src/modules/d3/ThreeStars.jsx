import React from "react"
import * as d3 from "d3"
import delay from "../../utils/delay"

//地球轨迹方程 (x*x)/(a*a) + (y*y)/(b*b) = 1
const ELLIPSE = {
  a: 500,
  b: 300,
  c: 400,
}
const t = 5 * 1000 //月亮绕地球一周时间为t
const T = 20 * 1000 //地球绕太阳一周时间为T,
const d_t = (1 / 60) * 1000 //60帧
const PI = Math.PI
const d_cita = (2 * PI * d_t) / T //地球相对太阳的角度变化量
const d_beta = (2 * PI * d_t) / t //月亮相对地球的角度变化量
const r = 40 //月球绕地球半径

class ThreeStars2D extends React.Component {
  constructor(props) {
    super(props)
    this.center = null
    this.timer = null
    this.sun = null
    this.moon = null
    this.earth = null
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    await delay(10)
    const width = this.refs.threeStars2D.clientWidth
    const height = this.refs.threeStars2D.clientHeight

    this.center = {
      x: width / 2,
      y: height / 2,
    }

    let svg = d3
      .select(this.refs.threeStars2D)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")

    svg
      .append("ellipse")
      .attr("cx", this.center.x)
      .attr("cy", this.center.y) //椭圆
      .attr("rx", ELLIPSE.a)
      .attr("ry", ELLIPSE.b)
      .attr("stroke", "#ccc")
      .attr("stroke-width", "1")
      .attr("fill", "none")
    // 初始位置
    this.sun = {
      x: this.center.x - ELLIPSE.c,
      y: this.center.y,
      r: 50,
      color: "red",
      cita: 0,
    }
    this.earth = {
      x: this.center.x + ELLIPSE.a,
      y: this.center.y,
      r: 10,
      color: "blue",
      cita: 0,
    }
    this.moon = {
      x: this.center.x + ELLIPSE.a + r,
      y: this.center.y,
      r: 5,
      color: "grey",
      cita: 0,
    }
    this.addCircle(svg, "sun", this.sun)
    this.addCircle(svg, "earth", this.earth)
    this.addCircle(svg, "moon", this.moon)

    this.runSimulation(svg, this.center)
  }

  addCircle(svg, name, obj) {
    svg
      .append("circle")
      .attr("id", name)
      .attr("cx", obj.x)
      .attr("cy", obj.y)
      .attr("r", obj.r)
      .attr("fill", obj.color)
  }

  runSimulation(svg, center) {
    this.timer = setInterval(() => {
      this.earth.cita += d_cita
      this.moon.cita += d_beta
      this.earth.x = center.x + ELLIPSE.a * Math.cos(this.earth.cita)
      this.earth.y = center.y - ELLIPSE.b * Math.sin(this.earth.cita)
      this.moon.x = this.earth.x + r * Math.cos(this.moon.cita)
      this.moon.y = this.earth.y + r * Math.sin(this.moon.cita)
      svg.select("#earth").attr("cx", this.earth.x).attr("cy", this.earth.y)
      svg.select("#moon").attr("cx", this.moon.x).attr("cy", this.moon.y)
    }, d_t)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div ref="threeStars2D" style={{ width: "100%", height: "100%" }}></div>
    )
  }
}

export default ThreeStars2D
