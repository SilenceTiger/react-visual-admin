import Introduce from "./start/Introduce"
import SimpleEarth from "./start/SimpleEarth"
import ThreeStar from "./start/ThreeStar"
export default {
  name: "three",
  routes: [
    {
      name: "three",
      path: "/three/start/introduce",
      component: Introduce,
    },
    {
      name: "three",
      path: "/three/start/simpleEarth",
      component: SimpleEarth,
    },
    {
      name: "three",
      path: "/three/start/threeStar",
      component: ThreeStar,
    },
  ],
}
