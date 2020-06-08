import React from "react"
import * as THREE from "three"
import * as OrbitControls from "three-orbitcontrols"
import delay from "../../../utils/delay"
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader"
import { OutlineEffect } from "three/examples/jsm/effects/OutlineEffect.js"
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js"
const LOADER = new MMDLoader()
const MODEL = "models/mmd/miku/miku_v2.pmd"
const vmdFiles = ["/models/mmd/vmds/wavefile_v2.vmd"]
const cameraFiles = ["models/mmd/vmds/wavefile_camera.vmd"]
const audioFile = "models/mmd/audios/wavefile_short.mp3"
const audioParams = { delayTime: (160 * 1) / 30 }

class MikuDance extends React.Component {
  constructor(props) {
    super(props)
    this.scene = null
    this.renderer = null
    this.camera = null
    this.mesh = null
    this.effect = null
    this.helper = null
    this.listener = null
    this.requestAnimationFrame = null
    this.clock = new THREE.Clock()
  }

  componentDidMount() {
    this.init()
  }

  async init() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)
    this.scene.add(new THREE.PolarGridHelper(30, 10))

    //环境光
    let light = new THREE.HemisphereLight(0xbbbbff, 0x444422)
    light.position.set(0, 1, 0)
    this.scene.add(light)

    await delay(10)
    let width = this.refs.three.clientWidth //window.innerWidth //窗口宽度
    let height = this.refs.three.clientHeight //window.innerHeight //窗口高度

    //创建相机 CAMERA
    this.camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000)

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height) //设置渲染区域尺寸
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.refs.three.appendChild(this.renderer.domElement) //body元素中插入canvas对象
    this.effect = new OutlineEffect(this.renderer)

    let controls = new OrbitControls(this.camera, this.renderer.domElement)
    controls.target.set(0, 0.9, 0)
    controls.update()
    this.renderer.render(this.scene, this.camera)
    window.addEventListener("resize", this.onWindowResize.bind(this), false)

    typeof window.Ammo === "function"
      ? window.Ammo().then(() => {
          this.loadModel()
        })
      : this.loadModel()
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
    this.helper = new MMDAnimationHelper()
    LOADER.loadWithAnimation(MODEL, vmdFiles, function (mmd) {
      that.mesh = mmd.mesh
      that.helper.add(that.mesh, {
        animation: mmd.animation,
        physics: true,
      })
      LOADER.loadAnimation(cameraFiles, that.camera, function (
        cameraAnimation
      ) {
        that.helper.add(that.camera, {
          animation: cameraAnimation,
        })
        new THREE.AudioLoader().load(audioFile, function (buffer) {
          that.listener = new THREE.AudioListener()
          let audio = new THREE.Audio(that.listener).setBuffer(buffer)
          that.listener.position.z = 1
          that.helper.add(audio, audioParams)
          that.scene.add(audio)
          that.scene.add(that.listener)
          that.scene.add(that.mesh)
          that.renderGL()
        })
      })
    })
  }

  componentWillUnmount() {
    try {
      this.helper.audio.stop()
    } catch {
      setTimeout(() => {
        try {
          this.helper.audio.stop()
        } catch (e) {
          console.log(e)
        }
      }, audioParams.delayTime * 1000)
    }
    this.scene.children = []
    window.removeEventListener("resize", this.onWindowResize.bind(this), false)
    window.cancelAnimationFrame(this.requestAnimationFrame)
  }

  renderGL() {
    this.helper.update(this.clock.getDelta())
    this.effect.render(this.scene, this.camera)
    this.requestAnimationFrame = requestAnimationFrame(this.renderGL.bind(this))
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

export default MikuDance
