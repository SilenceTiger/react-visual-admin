import React, { useLayoutEffect } from "react"
import * as d3 from "d3"
import "./home.less"

function Home() {
  useLayoutEffect(() => {
    let i = 0
    let svg = d3
      .select("#home")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%")
    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "#222222")
      .on("ontouchstart" in document ? "touchmove" : "mousemove", particle)
    function particle() {
      let m = d3.mouse(this)
      svg
        .insert("circle", "rect")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, 0.5))
        .style("stroke-opacity", 1)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 100)
        .style("stroke-opacity", 1e-6)
        .remove()
      d3.event.preventDefault()
    }
  }, [])
  return <div id="home" style={{ width: "100%", height: "100%" }}></div>
}

export default Home
