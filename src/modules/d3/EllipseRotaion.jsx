import React from "react"
import * as d3 from "d3"
import delay from "../../utils/delay"

const T = 10 * 1000 //周期10秒
const t = (1 / 60) * 1000 //每隔时间t执行一次动画
const PI = Math.PI
const mi_cita = (2 * PI * t) / T //每隔时间t，角度变化量
const r = 40 //圆半径
const r_max = 60
const r_min = 20
const a = 300 //椭圆a b参数,以center作为o  x^2/a^2 + y^2/b^2 = 1
const b = 150

const CIRCLES = [0, PI / 3, (2 * PI) / 3, PI, (4 * PI) / 3, (5 * PI) / 3]

class EllipseRotaion extends React.Component {
  constructor(props) {
    super(props)
    this.center = null
    this.timer = null
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    await delay(10)
    const width = this.refs.ellipseRotation.clientWidth
    const height = this.refs.ellipseRotation.clientHeight

    this.center = {
      x: width / 2,
      y: height / 2,
    }

    let svg = d3
      .select(this.refs.ellipseRotation)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")

    svg
      .append("ellipse")
      .attr("cx", this.center.x)
      .attr("cy", this.center.y) //椭圆
      .attr("rx", a)
      .attr("ry", b)
      .attr("stroke", "#ccc")
      .attr("stroke-width", "1")
      .attr("fill", "none")

    this.addCircle(svg, this.center)
    this.runSimulation(svg, this.center)
  }

  addCircle(svg, center) {
    for (let i = 0; i < CIRCLES.length; i++) {
      let cita = CIRCLES[i]
      const _x = center.x + a * Math.cos(cita)
      const _y = center.y - b * Math.sin(cita)
      svg
        .append("circle")
        .attr("id", "circle" + i)
        .attr("cx", _x)
        .attr("cy", _y)
        .attr("r", r)
        .attr("fill", "#ee3333")
    }
  }

  runSimulation(svg, center) {
    let that = this
    this.timer = setInterval(function () {
      for (var i = 0; i < CIRCLES.length; i++) {
        CIRCLES[i] += mi_cita
        if (CIRCLES[i] >= 2 * PI) {
          CIRCLES[i] = 0
        }
        var _x = center.x + a * Math.cos(CIRCLES[i])
        var _y = center.y - b * Math.sin(CIRCLES[i])
        var _r = that.calculateRadius(CIRCLES[i])
        svg
          .select("#circle" + i)
          .attr("cx", _x)
          .attr("cy", _y)
          .attr("r", _r)
          .attr("fill", "#ee3333")
      }
    }, t)
  }

  calculateRadius(cita) {
    var _r
    if (cita > 0 && cita <= PI / 2) {
      var linear1 = d3
        .scaleLinear()
        .domain([0, PI / 2])
        .range([r, r_min])
      _r = linear1(cita)
    } else if (cita > PI / 2 && cita <= PI) {
      var linear2 = d3
        .scaleLinear()
        .domain([PI / 2, PI])
        .range([r_min, r])
      _r = linear2(cita)
    } else if (cita > PI / 2 && cita <= (3 / 2) * PI) {
      var linear3 = d3
        .scaleLinear()
        .domain([PI, (3 / 2) * PI])
        .range([r, r_max])
      _r = linear3(cita)
    } else if (cita > (3 / 2) * PI && cita <= 2 * PI) {
      var linear4 = d3
        .scaleLinear()
        .domain([(3 / 2) * PI, 2 * PI])
        .range([r_max, r])
      _r = linear4(cita)
    } else {
      _r = 40
    }
    return _r
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div
        ref="ellipseRotation"
        id="ellipse-rotation"
        style={{ width: "100%", height: "100%" }}
      ></div>
    )
  }
}

export default EllipseRotaion
