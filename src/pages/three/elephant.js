import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function elephant() {
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })

  const fov = 45
  const aspect = 2 // the canvas default
  const near = 0.1
  const far = 100
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
  camera.position.set(0, 5, 10)

  const controls = new OrbitControls(camera, canvas)
  controls.target.set(0, 2, 0)
  controls.update()

  const scene = new THREE.Scene()
  const skyColor = 0x110f21 // dark blue
  const groundColor = 0x5b5968 // dark gray

  const loader = new THREE.TextureLoader()
  scene.background = loader.load('/three/textures/stars.jpg')

  {
    const planeSize = 20
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(groundColor),
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(planeGeo, planeMat)
    mesh.rotation.x = Math.PI * -0.5
    scene.add(mesh)
  }

  {
    const intensity = 2
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity)
    scene.add(light)
  }

  {
    const color = 0xffffff
    const intensity = 2.5
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(0, 10, 0)
    light.target.position.set(-5, 0, 0)
    scene.add(light)
    scene.add(light.target)
  }

  {
    const gltfLoader = new GLTFLoader()
    const url = '/three/models/elephant.glb'
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene
      root.scale.set(30, 30, 30) // object size
      scene.add(root)
    })
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      renderer.setSize(width, height, false)
    }

    return needResize
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
    }

    renderer.render(scene, camera)

    requestAnimationFrame(render)
  }

  requestAnimationFrame(render)
}

elephant()
