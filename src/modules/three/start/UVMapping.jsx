import React from "react"
import * as THREE from "three"
import * as OrbitControls from "three-orbitcontrols"
import delay from "../../../utils/delay"

const IMG_ARRAY = [
  require("../../../assets/images/uv-ge.jpg"),
  require("../../../assets/images/uv-chen.jpg"),
  require("../../../assets/images/uv-ai.jpg"),
  require("../../../assets/images/uv-gao.jpg"),
  require("../../../assets/images/uv-feng.jpg"),
  require("../../../assets/images/uv-niu.jpg"),
]

class Introduce extends React.Component {
  constructor(props) {
    super(props)
    this.scene = null
    this.renderer = null
    this.camera = null

    this.cubeMesh = null
    this.clock = null
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    this.scene = new THREE.Scene()
    this.initMesh()

    //辅助坐标系
    let axisHelper = new THREE.AxisHelper(250)
    this.scene.add(axisHelper)

    //点光源
    let point = new THREE.PointLight(0xffffff)
    point.position.set(400, 200, 300) //点光源位置
    this.scene.add(point) //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x444444)
    this.scene.add(ambient)

    await delay(10)
    let width = this.refs.three.clientWidth //window.innerWidth //窗口宽度
    let height = this.refs.three.clientHeight //window.innerHeight //窗口高度
    let k = width / height //窗口宽高比
    let s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机 CAMERA
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    this.camera.position.set(300, 300, 100) //设置相机位置
    this.camera.lookAt(this.scene.position) //设置相机方向(指向的场景对象)
    // RENDERER
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(width, height) //设置渲染区域尺寸
    this.renderer.setClearColor(0x00000, 1) //设置背景颜色
    this.refs.three.appendChild(this.renderer.domElement) //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    this.clock = new THREE.Clock()
    this.renderGL()
    new OrbitControls(this.camera, this.renderer.domElement)

    // let controls = new OrbitControls(this.camera, this.renderer.domElement)
    // controls.addEventListener("change", this.renderGL.bind(this))
  }

  initMesh() {
    let cubeGeo = new THREE.BoxGeometry(100, 100, 100) //创建一个立方体几何对象Geometry

    let meshFaceMaterial = []
    IMG_ARRAY.forEach((img) => {
      meshFaceMaterial.push(
        new THREE.MeshPhongMaterial({
          map: THREE.ImageUtils.loadTexture(img),
          side: THREE.DoubleSide,
        })
      )
    })

    this.cubeMesh = new THREE.Mesh(cubeGeo, meshFaceMaterial)
    this.cubeMesh.position.set(0, 0, 0)
    this.scene.add(this.cubeMesh)

    let newCubeMesh = this.cubeMesh.clone()
    newCubeMesh.position.set(150, 150, 150)
    this.scene.add(newCubeMesh)
  }

  renderGL() {
    let delta = this.clock.getDelta()
    this.renderer.render(this.scene, this.camera)
    this.cubeMesh.rotateY(delta)

    requestAnimationFrame(this.renderGL.bind(this))
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
