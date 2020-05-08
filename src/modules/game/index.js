import Snake from "./Snake"
export default {
  name: "game",
  routes: [
    {
      name: "snake",
      path: "/game/snake",
      component: Snake,
    },
  ],
}
