import Introduce from "./start/Introduce"
import SimpleEarth from "./start/SimpleEarth"
import ThreeStar from "./start/ThreeStar"
import UVMapping from "./start/UVMapping"
import MagicCube from "./start/MagicCube"
import VRMLoader from "./start/VRMLoader"
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
    {
      name: "three",
      path: "/three/start/uvMapping",
      component: UVMapping,
    },
    {
      name: "three",
      path: "/three/start/magicCube",
      component: MagicCube,
    },
    {
      name: "three",
      path: "/three/start/VRMLoader",
      component: VRMLoader,
    },
  ],
}
