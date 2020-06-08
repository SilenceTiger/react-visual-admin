import React from "react"
import * as d3 from "d3"
import delay from "../../utils/delay"
import { Ball, Vector2, getForce, getA, getSpeed, getS } from "./Ball"

const d_t = 1

class CustomForce extends React.Component {
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

    this.sun = new Ball(
      100,
      20,
      "red",
      new Vector2(this.center.x, this.center.y),
      new Vector2(0, 0)
    )

    this.earth = new Ball(
      10,
      10,
      "blue",
      new Vector2(this.center.x + 200, this.center.y),
      new Vector2(1, 1)
    )

    this.addCircle(svg, "sun", this.sun)
    this.addCircle(svg, "earth", this.earth)

    this.runSimulation(svg, this.center)
  }

  addCircle(svg, name, obj) {
    svg
      .append("circle")
      .attr("id", name)
      .attr("cx", obj.location.x)
      .attr("cy", obj.location.y)
      .attr("r", obj.r)
      .attr("fill", obj.color)
  }

  runSimulation(svg, center) {
    this.timer = setInterval(() => {
      //作用于地球的力
      const F = getForce(this.sun, this.earth)
      const a = getA(F, this.earth)
      const s = getS(this.earth.speed, a, d_t)
      const v = getSpeed(this.earth.speed, a, d_t)
      //更新地球状态
      this.earth.location.x += s.x
      this.earth.location.y += s.y
      this.earth.speed = v
      svg
        .select("#earth")
        .attr("cx", this.earth.location.x)
        .attr("cy", this.earth.location.y)
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

export default CustomForce
