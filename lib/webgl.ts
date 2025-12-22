import * as THREE from "three"

// WebGL utilities and helpers
export class WebGLScene {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  animationId: number | null = null

  constructor(canvas: HTMLCanvasElement) {
    // Scene
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Handle resize
    window.addEventListener("resize", this.handleResize.bind(this))
  }

  private handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate())
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }
    window.removeEventListener("resize", this.handleResize.bind(this))
    this.renderer.dispose()
  }
}


