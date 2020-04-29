import React from "react"
import * as THREE from "three"
import * as OrbitControls from "three-orbitcontrols"
import delay from "../../../utils/delay"
import { Vector3 } from "three"
// const THREE = require("three")
// const OrbitControls = require("three-orbitcontrols")
// 两种引入方式都可以
const earthImg = require("../../../assets/images/earth.jpg")

class Introduce extends React.Component {
  constructor(props) {
    super(props)
    this.scene = null
    this.renderer = null
    this.camera = null

    this.cubeMesh = null
    this.sphereMesh = null
    this.cylindeMesh = null

    this.T0 = 0
    this.T1 = 0
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
    point.position.set(400, 0, 0) //点光源位置
    this.scene.add(point) //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0xffffff)
    this.scene.add(ambient)

    await delay(10)
    let width = this.refs.three.clientWidth //window.innerWidth //窗口宽度
    let height = this.refs.three.clientHeight //window.innerHeight //窗口高度
    let k = width / height //窗口宽高比
    let s = 200 //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机 CAMERA
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
    this.camera.position.set(200, 100, 100) //设置相机位置
    this.camera.lookAt(this.scene.position) //设置相机方向(指向的场景对象)
    // RENDERER
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(width, height) //设置渲染区域尺寸
    this.renderer.setClearColor(0x00000, 1) //设置背景颜色
    this.refs.three.appendChild(this.renderer.domElement) //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    this.T0 = new Date()
    this.renderGL()
    new OrbitControls(this.camera, this.renderer.domElement)

    // let controls = new OrbitControls(this.camera, this.renderer.domElement)
    // controls.addEventListener("change", this.renderGL.bind(this))
  }

  async initMesh() {
    let sphereGeo = new THREE.SphereGeometry(100, 40, 40) //创建一个球体几何对象
    let ImageLoader = new THREE.ImageLoader()
    let img = await ImageLoader.load(earthImg)
    let texture = new THREE.Texture(img)
    texture.needsUpdate = true
    let materialBasic = new THREE.MeshPhongMaterial({
      //color: 0xffff00,
      //wireframe: true,
      map: texture,
    })
    this.sphereMesh = new THREE.Mesh(sphereGeo, materialBasic)
    this.sphereMesh.position.set(0, 0, 0) //几何体中心位置
    this.scene.add(this.sphereMesh)

    //line
    // let geo = new THREE.Geometry()
    // let arc = new THREE.ArcCurve(0, 0, 10, 0, 2 * Math.PI)
    // let points = arc.getPoints(50)
    // geo.setFromPoints(points)
    // let material = new THREE.LineBasicMaterial({
    //   color: 0xff0000,
    // })
    // this.line = new THREE.Line(geo, material)
    // let V1 = new Vector3(0, 2, 0)
    // this.line.position.set(100, 0, 0)
    // this.line.rotateOnAxis(V1, Math.PI / 2)
    // this.scene.add(this.line)

    // 点模型
    let geometry2 = new THREE.Geometry()
    let o = new THREE.Vector3(0, 0, 0)
    let p1 = new THREE.Vector3(102, 0, 0)
    let p2 = new THREE.Vector3(0, 102, 0)
    let cp = new THREE.Vector3().addVectors(p1, p2).divideScalar(2)
    let l = p1.distanceTo(p2)
    let L = cp.distanceTo(o)
    let K = cp.multiplyScalar((l + L) / L)

    geometry2.vertices.push(p1, p2, K)
    let material2 = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 10,
    })
    //点模型对象
    let points = new THREE.Points(geometry2, material2)
    this.scene.add(points) //点模型对象添加到场景中

    //贝塞尔曲线
    let geometry = new THREE.Geometry()
    let curve = new THREE.QuadraticBezierCurve3(p1, K, p2)
    let points1 = curve.getPoints(100) //分段数100，返回101个顶点
    geometry.setFromPoints(points1)
    //材质对象
    let material = new THREE.LineBasicMaterial({
      color: 0xff0000,
    })
    let line = new THREE.Line(geometry, material)
    this.scene.add(line) //线条对象添加到场景中
  }

  renderGL() {
    // 保证每次执行时间内转动的角度是一样的
    this.T1 = new Date()
    let t = this.T1 - this.T0
    this.T0 = this.T1
    this.renderer.render(this.scene, this.camera) //执行渲染操作
    this.sphereMesh.rotateY(0.001 * t)
    //this.line.rotateY(0.001 * t)
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
