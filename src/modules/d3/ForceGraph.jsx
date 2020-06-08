import React from "react"
import * as d3 from "d3"
import { deepCopy } from "../../utils"
import delay from "../../utils/delay"
const data = require("./data/force-graph.json")

class ForceGraph extends React.Component {
  componentDidMount() {
    this.init()
  }

  async init() {
    await delay(10)
    const width = this.refs.force.clientWidth
    const height = this.refs.force.clientHeight
    const nodes = deepCopy(data.nodes)
    nodes.forEach((item) => {
      item.r = Math.random() * 50
      if (item.r < 20) item.r = 20
    })
    const links = deepCopy(data.links)
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "collide",
        d3
          .forceCollide()
          .radius(function (d) {
            return d.r
          })
          .iterations(2)
          .strength(0.95)
      )
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))

    let svg = d3
      .select(this.refs.force)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("width", "100%")
      .attr("height", "100%")

    const color = () => {
      const scale = d3.scaleOrdinal(d3.schemeCategory10)
      return (d) => scale(d.group)
    }

    const drag = (simulation) => {
      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(d) {
        d.fx = d3.event.x
        d.fy = d3.event.y
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    }

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value)) //.distance()

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => d.r)
      .attr("fill", color(nodes))
      .call(drag(simulation))

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y)

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y)
    })

    node.append("title").text((d) => d.id)
  }

  render() {
    return (
      <div
        ref="force"
        id="d3-force"
        style={{ width: "100%", height: "100%" }}
      ></div>
    )
  }
}

export default ForceGraph
