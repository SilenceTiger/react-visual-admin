import React from "react"
import delay from "../../../utils/delay"
// import { vertexShader, fragmentShader } from "../shader"
const THREE = require("three")
const OrbitControls = require("three-orbitcontrols")

const SPHERES = [
  {
    name: "Sun",
    img: require("../../../assets/images/sun.jpg"),
    raduis: 100,
    position: [0, 0, 0],
    cita: 0,
  },
  {
    name: "Earth",
    img: require("../../../assets/images/earth.jpg"),
    raduis: 50,
    position: [650, 0, 0],
    cita: 0,
    T: 30,
    R: 650,
  },
  {
    name: "Moon",
    img: require("../../../assets/images/moon.jpg"),
    raduis: 30,
    position: [800, 0, 0],
    cita: 0,
    T: 5,
    R: 150,
  },
]

class Introduce extends React.Component {
  constructor(props) {
    super(props)
    this.scene = null
    this.renderer = null
    this.camera = null
    this.clock = null
  }

  componentDidMount() {
    this.init()
  }

  componentWillUnmount() {
    //释放内存
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      this.scene.remove(this.scene.children[i])
    }
    window.cancelAnimationFrame(this.requestAnimationFrame)
    window.removeEventListener("click", this.onClick)
  }

  async init() {
    this.scene = new THREE.Scene()
    this.initBackground()

    //辅助坐标系
    // let axisHelper = new THREE.AxisHelper(250)
    // this.scene.add(axisHelper)

    this.initMesh()
    //this.initAnimation()
    this.initLight()
    await delay(10) //正确获取元素高度宽度
    this.initCameraAndRenderer()
    //执行渲染操作   指定场景、相机作为参数
    this.clock = new THREE.Clock()
    this.renderGL()
    new OrbitControls(this.camera, this.renderer.domElement)
    window.addEventListener("click", this.onClick.bind(this))

    window.onresize = function () {
      let width = this.refs.three.clientWidth
      let height = this.refs.three.clientHeight
      let k = width / height
      let s = 300
      this.renderer.setSize(width, height)
      this.camera.left = -s * k
      this.camera.right = s * k
      this.camera.top = s
      this.camera.bottom = -s
      this.camera.updateProjectionMatrix()
    }.bind(this)
  }

  initBackground() {
    let geom = new THREE.Geometry()
    let material = new THREE.ParticleBasicMaterial({
      size: 0.01,
      vertexColors: true,
    })
    let n = 1200
    for (let i = 0; i < 3000; i++) {
      let particle = new THREE.Vector3(
        (Math.random() - 0.5) * n,
        (Math.random() - 0.5) * n,
        (Math.random() - 0.5) * n
      )
      geom.vertices.push(particle)
      let color_k = Math.random()
      geom.colors.push(new THREE.Color(color_k, color_k, color_k * 0.6))
    }

    let cloud = new THREE.ParticleSystem(geom, material)
    this.scene.add(cloud)
  }

  async initMesh() {
    SPHERES.forEach((item) => {
      this.createSphere(item)
    })
  }

  async createSphere(data) {
    let sphereGeo = new THREE.SphereGeometry(data.raduis, 50, 50) //创建一个球体几何对象
    let ImageLoader = new THREE.ImageLoader()
    let img = await ImageLoader.load(data.img)
    let texture = new THREE.Texture(img)
    texture.needsUpdate = true
    let materialBasic = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    })
    let sphereMesh = new THREE.Mesh(sphereGeo, materialBasic)
    sphereMesh.position.set(...data.position) //几何体中心位置
    sphereMesh.name = data.name
    data.mesh = sphereMesh
    this.scene.add(sphereMesh)
  }

  // initAnimation() {
  //   let posTrack = new THREE.KeyframeTrack(
  //     ".scale",
  //     [0, 4],
  //     [0.01, 0.01, 0.01, 1, 1, 1]
  //   )
  //   let clip = new THREE.AnimationClip("default", 4, [posTrack])
  //   this.mixer = new THREE.AnimationMixer()
  //   let AnimationAction = this.mixer.clipAction(clip, this.sun)
  //   AnimationAction.loop = THREE.LoopOnce
  //   AnimationAction.clampWhenFinished = true
  //   AnimationAction.play()
  // }

  initLight() {
    let directionalLight = new THREE.DirectionalLight(16777215, 0.9)
    directionalLight.position.set(400, 200, 300)
    this.scene.add(directionalLight)
    let directionalLight2 = new THREE.DirectionalLight(16777215, 0.9)
    directionalLight2.position.set(-400, -200, -300)
    this.scene.add(directionalLight2)
    let ambient = new THREE.AmbientLight(16777215, 0.6)
    this.scene.add(ambient)
  }

  initCameraAndRenderer() {
    let width = this.refs.three.clientWidth //window.innerWidth //窗口宽度
    let height = this.refs.three.clientHeight //window.innerHeight //窗口高度
    let k = width / height //窗口宽高比
    let s = 300 //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机 CAMERA
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 2000) //正交
    //this.camera = new THREE.PerspectiveCamera(90, width / height, 1, 2000) //透视摄像机
    this.camera.position.set(0, 400, 1000) //设置相机位置
    this.camera.lookAt(this.scene.position) //设置相机方向(指向的场景对象)
    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height) //设置渲染区域尺寸
    this.renderer.setClearColor(0x000000, 1) //设置背景颜色
    this.refs.three.appendChild(this.renderer.domElement) //body元素中插入canvas对象
  }

  renderGL() {
    let delta = this.clock.getDelta()
    //自转
    SPHERES.forEach((s) => {
      s.mesh.rotation.y += delta
    })
    //公转
    let earth = SPHERES[1]
    earth.cita += (delta * 2 * Math.PI) / earth.T
    earth.mesh.position.set(
      earth.R * Math.cos(earth.cita),
      0,
      earth.R * Math.sin(earth.cita)
    )

    let moon = SPHERES[2]
    moon.cita += (delta * 2 * Math.PI) / moon.T
    moon.mesh.position.set(
      moon.R * Math.cos(moon.cita) + earth.R * Math.cos(earth.cita),
      0,
      moon.R * Math.sin(moon.cita) + earth.R * Math.sin(earth.cita)
    )

    this.camera.lookAt(earth.mesh.position)
    //console.log(delta) //0.016 ~0.017
    // this.uniforms.time.value += delta
    // this.sun.rotation.y -= 0.005
    // this.mixer.update(delta)
    this.renderer.render(this.scene, this.camera)
    this.requestAnimationFrame = requestAnimationFrame(this.renderGL.bind(this))
  }

  //射线来决定第一个点中的物体
  onClick(e) {
    try {
      let offsetTop = this.refs.three.offsetTop
      let offsetLeft = this.refs.three.offsetLeft
      let width = this.refs.three.clientWidth
      let height = this.refs.three.clientHeight
      var Sx = e.clientX - offsetLeft
      var Sy = e.clientY - offsetTop
      let x = (Sx / width) * 2 - 1
      let y = -(Sy / height) * 2 + 1
      let raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera)
      let intersectsArr = SPHERES.map((item) => item.mesh)
      var intersects = raycaster.intersectObjects(intersectsArr, false)
      if (intersects.length > 0) {
        console.log(intersects[0].object.name)
      }
    } catch {
      console.log("change page")
    }
  }

  render() {
    return (
      <div
        ref="three"
        id="three"
        style={{ width: "100%", height: "100%" }}
      ></div>
    )
  }
}

export default Introduce
