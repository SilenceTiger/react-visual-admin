import ForceGraph from "./ForceGraph"
import EllipseRotaion from "./EllipseRotaion"
import ThreeStars from "./ThreeStars"
import CustomForce from "./CustomForce"
export default {
  name: "d3",
  routes: [
    {
      name: "d3",
      path: "/d3/ellipseRotaion",
      component: EllipseRotaion,
    },
    {
      name: "d3",
      path: "/d3/threeStars",
      component: ThreeStars,
    },
    {
      name: "d3",
      path: "/d3/customForce",
      component: CustomForce,
    },
    {
      name: "d3",
      path: "/d3/forceGraph",
      component: ForceGraph,
    },
  ],
}
