import React from "react"
import * as THREE from "three"
import * as OrbitControls from "three-orbitcontrols"
import delay from "../../../utils/delay"
import { VRMLoader } from "three/examples/jsm/loaders/VRMLoader"
const LOADER = new VRMLoader()
const MODEL = require("../../../threePlugins/models/vrm/Alicia/AliciaSolid.vrm")

class Woman extends React.Component {
  constructor(props) {
    super(props)
    this.scene = null
    this.renderer = null
    this.camera = null
    this.mesh = null
    this.clock = new THREE.Clock()
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    //辅助坐标系
    let axisHelper = new THREE.AxisHelper(250)
    this.scene.add(axisHelper)

    //环境光
    let light = new THREE.HemisphereLight(0xbbbbff, 0x444422)
    light.position.set(0, 1, 0)
    this.scene.add(light)

    await delay(10)
    let width = this.refs.three.clientWidth //window.innerWidth //窗口宽度
    let height = this.refs.three.clientHeight //window.innerHeight //窗口高度

    //创建相机 CAMERA
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.25, 20)
    this.camera.position.set(0, 1.6, -2.2)

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height) //设置渲染区域尺寸
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.refs.three.appendChild(this.renderer.domElement) //body元素中插入canvas对象
    let controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.target.set(0, 0.9, 0)
    controls.update()
    this.renderer.render(this.scene, this.camera)
    window.addEventListener("resize", this.onWindowResize.bind(this), false)
    this.loadModel()
  }

  onWindowResize() {
    let width = this.refs.three.clientWidth //window.innerWidth //窗口宽度
    let height = this.refs.three.clientHeight //window.innerHeight //窗口高度
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
  }

  async loadModel() {
    let that = this
    LOADER.load(MODEL, function (vrm) {
      // VRMLoader doesn't support VRM Unlit extension yet so
      // converting all materials to THREE.MeshBasicMaterial here as workaround so far.
      vrm.scene.traverse(function (object) {
        if (object.material) {
          if (Array.isArray(object.material)) {
            for (let i = 0, il = object.material.length; i < il; i++) {
              let material = new THREE.MeshBasicMaterial()
              THREE.Material.prototype.copy.call(material, object.material[i])
              material.color.copy(object.material[i].color)
              material.map = object.material[i].map
              material.skinning = object.material[i].skinning
              material.morphTargets = object.material[i].morphTargets
              material.morphNormals = object.material[i].morphNormals
              object.material[i] = material
            }
          } else {
            let material = new THREE.MeshBasicMaterial()
            THREE.Material.prototype.copy.call(material, object.material)
            material.color.copy(object.material.color)
            material.map = object.material.map
            material.skinning = object.material.skinning
            material.morphTargets = object.material.morphTargets
            material.morphNormals = object.material.morphNormals
            object.material = material
          }
        }
      })
      that.mesh = vrm.scene
      that.scene.add(that.mesh)
      that.renderGL()
    })
  }

  renderGL() {
    this.mesh.rotateY(this.clock.getDelta())
    this.renderer.render(this.scene, this.camera) //执行渲染操作
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

export default Woman
