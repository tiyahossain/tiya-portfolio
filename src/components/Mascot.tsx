import {
  Briefcase,
  Check,
  Copy,
  Flower2,
  Glasses,
  Heart,
  Moon,
  Palette,
  RefreshCw,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react'
import * as THREE from 'three'

class MascotAudioEngine {
  private ctx: AudioContext | null = null
  public enabled = true

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }
  }

  playMeow() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.16)
      osc.frequency.exponentialRampToValueAtTime(510, now + 0.38)

      gain.gain.setValueAtTime(0.01, now)
      gain.gain.linearRampToValueAtTime(0.22, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.44)
    } catch {
      /* audio silent fallback */
    }
  }

  playPurr() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const mod = this.ctx.createOscillator()
      const modGain = this.ctx.createGain()
      const masterGain = this.ctx.createGain()
      const now = this.ctx.currentTime

      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(72, now)

      mod.frequency.setValueAtTime(26, now)
      modGain.gain.setValueAtTime(22, now)
      mod.connect(osc.frequency)

      masterGain.gain.setValueAtTime(0.01, now)
      masterGain.gain.linearRampToValueAtTime(0.14, now + 0.1)
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65)

      osc.connect(masterGain)
      masterGain.connect(this.ctx.destination)

      mod.start(now)
      osc.start(now)
      mod.stop(now + 0.7)
      osc.stop(now + 0.7)
    } catch {
      /* audio silent fallback */
    }
  }

  playGlassesChime() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const now = this.ctx.currentTime
      ;[1300, 1750, 2300].forEach((freq, idx) => {
        if (!this.ctx) return
        const osc = this.ctx.createOscillator()
        const gain = this.ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now + idx * 0.07)

        gain.gain.setValueAtTime(0.001, now + idx * 0.07)
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.28)

        osc.connect(gain)
        gain.connect(this.ctx.destination)
        osc.start(now + idx * 0.07)
        osc.stop(now + idx * 0.07 + 0.32)
      })
    } catch {
      /* audio silent fallback */
    }
  }

  playTap() {
    if (!this.enabled) return
    try {
      this.initCtx()
      if (!this.ctx) return
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()
      const now = this.ctx.currentTime
      osc.type = 'sine'
      osc.frequency.setValueAtTime(560, now)
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.09)

      gain.gain.setValueAtTime(0.14, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

      osc.connect(gain)
      gain.connect(this.ctx.destination)
      osc.start(now)
      osc.stop(now + 0.1)
    } catch {
      /* audio silent fallback */
    }
  }
}

const audio = new MascotAudioEngine()

type CatMood = 'boss' | 'purr' | 'sleepy' | 'surprised' | 'proud'

interface SuitTheme3D {
  id: string
  name: string
  jacketColor: number
  lapelColor: number
  tieColor: number
  tieStripeColor: number
}

const SUIT_THEMES_3D: SuitTheme3D[] = [
  {
    id: 'navy',
    name: 'Executive Navy',
    jacketColor: 0x1e3a5f,
    lapelColor: 0x152943,
    tieColor: 0x2563eb,
    tieStripeColor: 0x93c5fd,
  },
  {
    id: 'black',
    name: 'Onyx Boardroom',
    jacketColor: 0x18181b,
    lapelColor: 0x09090b,
    tieColor: 0xdc2626,
    tieStripeColor: 0xfca5a5,
  },
  {
    id: 'pink',
    name: 'Blush Velvet',
    jacketColor: 0xbe185d,
    lapelColor: 0x9d174d,
    tieColor: 0x8b5cf6,
    tieStripeColor: 0xe9d5ff,
  },
  {
    id: 'emerald',
    name: 'Tycoon Emerald',
    jacketColor: 0x064e3b,
    lapelColor: 0x022c22,
    tieColor: 0xd97706,
    tieStripeColor: 0xfde68a,
  },
]

const BOSS_QUOTES: Record<CatMood, string[]> = {
  boss: [
    '“Your 3:00 PM presentation could have been an email with catnip.”',
    '“Reviewing the Q3 tuna revenue. Numbers are claw-some.”',
    "“I'm not micromanaging, I'm just supervising your keyboard naps.”",
    '“Reschedule the dog department meeting indefinitely.”',
    '“Promotion approved. Please deposit 3 Churu treats into my dish.”',
  ],
  purr: [
    '“*Purrrrrrr...* Excellent ergonomics on these head scratches!”',
    '“You may now have 15 minutes of uninterrupted cuddling time.”',
    '“Heart rate normalized. High-yield affection dividends recorded!”',
    '“10/10 scratch technique. You get an executive bonus.”',
  ],
  sleepy: [
    '“Power nap initiated. Forward all urgent calls to voicemail... zZz.”',
    "“I'm not sleeping, I'm meditating on synergistic fish futures.”",
    '“Do not disturb unless the treat cabinet has been compromised.”',
    '“Soft fluffy cat dreams loading... 87% complete...”',
  ],
  surprised: [
    '“Did someone say UNLIMITED CRUNCHIES IN THE BREAKROOM?!”',
    '“A red laser pointer in the boardroom?! Deploy tactical leaps!”',
    '“Alert! The vacuum cleaner has breached perimeter sector 4!”',
    '“Wait, did deadline just get moved up? My whiskers are tingling!”',
  ],
  proud: [
    '“Look at my pressed lapels and pristine whiskers. Pure boardroom elegance.”',
    '“CEO of Cuteness, Forbes 30 Under 30 Months.”',
    "“Excellence is not an option; it's a fluffy lifestyle.”",
    '“Adjusting glasses for maximum intellectual intimidation.”',
  ],
}

const hex = (value: number) => `#${value.toString(16).padStart(6, '0')}`

export default function Mascot() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // States
  const [mood, setMood] = useState<CatMood>('boss')
  const [suitTheme, setSuitTheme] = useState<SuitTheme3D>(SUIT_THEMES_3D[0])
  const [hasGlasses, setHasGlasses] = useState(true)
  const [hasFlowers, setHasFlowers] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSparkles, setShowSparkles] = useState(true)
  const [quote, setQuote] = useState<string>(BOSS_QUOTES.boss[0])
  const [petHearts, setPetHearts] = useState<{ id: number; x: number; y: number }[]>([])
  const [tailSpeed, setTailSpeed] = useState<'normal' | 'fast' | 'gentle'>('normal')
  const [copiedCode, setCopiedCode] = useState(false)

  // Sound sync
  useEffect(() => {
    audio.enabled = soundEnabled
  }, [soundEnabled])

  const mascot3D = useRef<{
    scene?: THREE.Scene
    camera?: THREE.PerspectiveCamera
    renderer?: THREE.WebGLRenderer
    catRoot?: THREE.Group
    headGroup?: THREE.Group
    bodyGroup?: THREE.Group
    glassesGroup?: THREE.Group
    flowersGroup?: THREE.Group
    tailSegments?: THREE.Group[]
    leftEyeIris?: THREE.Mesh
    rightEyeIris?: THREE.Mesh
    leftEyelid?: THREE.Mesh
    rightEyelid?: THREE.Mesh
    materials: {
      jacket?: THREE.MeshStandardMaterial
      lapel?: THREE.MeshStandardMaterial
      tie?: THREE.MeshStandardMaterial
      tieStripe?: THREE.MeshStandardMaterial
    }
    targetPointer: THREE.Vector2
    smoothPointer: THREE.Vector2
    isOrbiting: boolean
    orbitTheta: number
    orbitPhi: number
    lastMouseX: number
    lastMouseY: number
    squishScale: number
    headNodAngle: number
    glassesTilt: number
    isWinking: boolean
    raycaster: THREE.Raycaster
  }>({
    materials: {},
    targetPointer: new THREE.Vector2(0, 0),
    smoothPointer: new THREE.Vector2(0, 0),
    isOrbiting: false,
    orbitTheta: 0,
    orbitPhi: 0.08,
    lastMouseX: 0,
    lastMouseY: 0,
    squishScale: 1.0,
    headNodAngle: 0,
    glassesTilt: 0,
    isWinking: false,
    raycaster: new THREE.Raycaster(),
  })

  const triggerNewQuote = useCallback(
    (targetMood?: CatMood) => {
      const active = targetMood || mood
      const list = BOSS_QUOTES[active]
      setQuote(list[Math.floor(Math.random() * list.length)])
    },
    [mood],
  )

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const width = container.clientWidth || 800
    const height = container.clientHeight || 650

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene()
    scene.background = null
    mascot3D.current.scene = scene

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100)
    camera.position.set(0, 0.5, 5)
    mascot3D.current.camera = camera

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mascot3D.current.renderer = renderer

    // 2. Lights matching photo: Key studio light, pink fill, warm rim
    const ambientLight = new THREE.AmbientLight(0xfff1f5, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(3.5, 6, 5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.width = 1024
    keyLight.shadow.mapSize.height = 1024
    keyLight.shadow.bias = -0.001
    scene.add(keyLight)

    const pinkRimLight = new THREE.DirectionalLight(0xffb6c1, 2.4)
    pinkRimLight.position.set(-4, 4, -4)
    scene.add(pinkRimLight)

    const softBounceLight = new THREE.PointLight(0xffc2d1, 1.2, 12)
    softBounceLight.position.set(0, -2, 3)
    scene.add(softBounceLight)

    // 3. Studio Pedestal & Contact Shadow Floor — navy slab to match the palette
    const pedestalGeo = new THREE.CylinderGeometry(2.2, 2.4, 0.2, 48)
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0f2a6b,
      roughness: 0.4,
      metalness: 0.05,
    })
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat)
    pedestal.position.y = -1.62
    pedestal.receiveShadow = true
    scene.add(pedestal)

    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.ShadowMaterial({ opacity: 0.22 }),
    )
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.y = -1.51
    shadowPlane.receiveShadow = true
    scene.add(shadowPlane)

    // 4. Cat Root Object
    const catRoot = new THREE.Group()
    catRoot.position.y = -0.22
    scene.add(catRoot)
    mascot3D.current.catRoot = catRoot

    // --- Materials Palette ---
    const whiteFurMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.82,
      metalness: 0.02,
    })

    const innerEarMat = new THREE.MeshStandardMaterial({
      color: 0xff9cb2,
      roughness: 0.65,
    })

    const nosePinkMat = new THREE.MeshStandardMaterial({
      color: 0xff7096,
      roughness: 0.4,
    })

    const sapphireIrisMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.12,
      metalness: 0.5,
      emissive: 0x0369a1,
      emissiveIntensity: 0.3,
    })

    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x090d16 })
    const scleraMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 })
    const eyelidMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 })

    const jacketMat = new THREE.MeshStandardMaterial({
      color: suitTheme.jacketColor,
      roughness: 0.6,
      metalness: 0.15,
    })
    const lapelMat = new THREE.MeshStandardMaterial({
      color: suitTheme.lapelColor,
      roughness: 0.5,
      metalness: 0.2,
    })
    const tieMat = new THREE.MeshStandardMaterial({
      color: suitTheme.tieColor,
      roughness: 0.35,
      metalness: 0.25,
    })
    const tieStripeMat = new THREE.MeshStandardMaterial({
      color: suitTheme.tieStripeColor,
      roughness: 0.3,
      metalness: 0.2,
    })
    const shirtMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
    })

    mascot3D.current.materials = {
      jacket: jacketMat,
      lapel: lapelMat,
      tie: tieMat,
      tieStripe: tieStripeMat,
    }

    // Lower body & Seated Paws
    const lowerBodyGeo = new THREE.SphereGeometry(0.85, 32, 24)
    lowerBodyGeo.scale(1.08, 0.88, 0.95)
    const lowerBody = new THREE.Mesh(lowerBodyGeo, whiteFurMat)
    lowerBody.position.set(0, -1.0, 0)
    lowerBody.castShadow = true
    catRoot.add(lowerBody)

    const pawGeo = new THREE.SphereGeometry(0.24, 24, 16)
    pawGeo.scale(1.15, 0.65, 1.4)
    ;[-0.48, 0.48].forEach((x) => {
      const paw = new THREE.Mesh(pawGeo, whiteFurMat)
      paw.position.set(x, -1.36, 0.36)
      paw.castShadow = true
      catRoot.add(paw)
    })

    // Suit Body Group
    const bodyGroup = new THREE.Group()
    bodyGroup.position.set(0, -0.65, 0)
    catRoot.add(bodyGroup)
    mascot3D.current.bodyGroup = bodyGroup

    // Jacket Torso
    const jacketMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.9, 1.12, 32),
      jacketMat,
    )
    jacketMesh.castShadow = true
    bodyGroup.add(jacketMesh)

    // White Shirt Center
    const shirtChest = new THREE.Mesh(
      new THREE.CylinderGeometry(0.35, 0.15, 0.65, 16, 1, false, -Math.PI / 3, (2 * Math.PI) / 3),
      shirtMat,
    )
    shirtChest.position.set(0, 0.28, 0.68)
    shirtChest.scale.set(1, 1, 0.5)
    bodyGroup.add(shirtChest)

    // Shirt Collar Wings
    const collarLeft = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 4), shirtMat)
    collarLeft.rotation.set(0.2, 0.4, 0.9)
    collarLeft.position.set(-0.2, 0.56, 0.63)
    bodyGroup.add(collarLeft)

    const collarRight = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 4), shirtMat)
    collarRight.rotation.set(0.2, -0.4, -0.9)
    collarRight.position.set(0.2, 0.56, 0.63)
    bodyGroup.add(collarRight)

    // Striped Necktie
    const tieKnot = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.15, 4), tieMat)
    tieKnot.rotation.x = Math.PI
    tieKnot.position.set(0, 0.47, 0.74)
    bodyGroup.add(tieKnot)

    const tieBody = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.56, 0.04), tieMat)
    tieBody.position.set(0, 0.18, 0.75)
    tieBody.rotation.x = 0.08
    bodyGroup.add(tieBody)

    ;[-0.08, 0.06, 0.2].forEach((y) => {
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.035, 0.045), tieStripeMat)
      stripe.position.set(0, y, 0.755)
      stripe.rotation.z = -0.3
      bodyGroup.add(stripe)
    })

    // Lapels
    const lapelLeft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.75, 0.08), lapelMat)
    lapelLeft.position.set(-0.34, 0.24, 0.66)
    lapelLeft.rotation.set(0.15, 0.35, -0.2)
    bodyGroup.add(lapelLeft)

    const lapelRight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.75, 0.08), lapelMat)
    lapelRight.position.set(0.34, 0.24, 0.66)
    lapelRight.rotation.set(0.15, -0.35, 0.2)
    bodyGroup.add(lapelRight)

    // Crossed Folded Executive Arms & Sleeves
    const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.19, 0.84, 16), jacketMat)
    armL.position.set(-0.25, -0.15, 0.78)
    armL.rotation.set(0.2, 0.1, 1.45)
    armL.castShadow = true
    bodyGroup.add(armL)

    const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.19, 0.84, 16), jacketMat)
    armR.position.set(0.25, -0.22, 0.82)
    armR.rotation.set(-0.2, -0.1, -1.45)
    armR.castShadow = true
    bodyGroup.add(armR)

    // White Cuffs & Folded White Paws
    const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 12, 24), shirtMat)
    cuff.position.set(0.24, -0.14, 0.85)
    cuff.rotation.set(0.2, 0, 1.45)
    bodyGroup.add(cuff)

    const frontPawL = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), whiteFurMat)
    frontPawL.position.set(-0.24, -0.16, 0.87)
    bodyGroup.add(frontPawL)

    const frontPawR = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), whiteFurMat)
    frontPawR.position.set(0.24, -0.21, 0.89)
    bodyGroup.add(frontPawR)

    // Buttons
    ;[-0.32, -0.48].forEach((y) => {
      const btn = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 }),
      )
      btn.rotation.x = Math.PI / 2
      btn.position.set(0, y, 0.84)
      bodyGroup.add(btn)
    })

    // Curled Persian Tail on the left side (matching photo)
    const tailGroup = new THREE.Group()
    tailGroup.position.set(0.55, -1.2, -0.38)
    catRoot.add(tailGroup)

    const tailSegments: THREE.Group[] = []
    let currentParent: THREE.Group = tailGroup

    for (let i = 0; i < 7; i++) {
      const segGroup = new THREE.Group()
      segGroup.position.set(0.04, i === 0 ? 0.1 : 0.2, -0.02)
      currentParent.add(segGroup)

      const radius = 0.22 - i * 0.015
      const segMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 14), whiteFurMat)
      segMesh.scale.set(1.0, 1.35, 1.0)
      segMesh.castShadow = true
      segGroup.add(segMesh)

      tailSegments.push(segGroup)
      currentParent = segGroup
    }
    mascot3D.current.tailSegments = tailSegments

    // Head Group (Smooth look-at tracking)
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.65, 0.05)
    catRoot.add(headGroup)
    mascot3D.current.headGroup = headGroup

    // Persian spherical head
    const headGeo = new THREE.SphereGeometry(1.02, 36, 32)
    headGeo.scale(1.16, 0.96, 1.02)
    const headMesh = new THREE.Mesh(headGeo, whiteFurMat)
    headMesh.castShadow = true
    headGroup.add(headMesh)

    // Cheek Fluff Tufts Left & Right
    const tuftGeo = new THREE.ConeGeometry(0.35, 0.72, 8)
    const cheekTuftL = new THREE.Mesh(tuftGeo, whiteFurMat)
    cheekTuftL.rotation.set(0.3, 0.3, 1.25)
    cheekTuftL.position.set(-1.08, -0.22, 0.1)
    headGroup.add(cheekTuftL)

    const cheekTuftR = new THREE.Mesh(tuftGeo, whiteFurMat)
    cheekTuftR.rotation.set(0.3, -0.3, -1.25)
    cheekTuftR.position.set(1.08, -0.22, 0.1)
    headGroup.add(cheekTuftR)

    // Ears
    const earOuterGeo = new THREE.ConeGeometry(0.38, 0.76, 4)
    earOuterGeo.scale(1.1, 1.0, 0.55)
    const earInnerGeo = new THREE.ConeGeometry(0.26, 0.55, 4)
    earInnerGeo.scale(1.0, 1.0, 0.3)

    // Left Ear
    const earL = new THREE.Group()
    earL.position.set(-0.62, 0.78, 0.05)
    earL.rotation.set(-0.15, -0.15, 0.25)
    earL.add(new THREE.Mesh(earOuterGeo, whiteFurMat))
    const innerL = new THREE.Mesh(earInnerGeo, innerEarMat)
    innerL.position.set(0, -0.05, 0.1)
    earL.add(innerL)
    headGroup.add(earL)

    // Right Ear
    const earR = new THREE.Group()
    earR.position.set(0.62, 0.78, 0.05)
    earR.rotation.set(-0.15, 0.15, -0.25)
    earR.add(new THREE.Mesh(earOuterGeo, whiteFurMat))
    const innerR = new THREE.Mesh(earInnerGeo, innerEarMat)
    innerR.position.set(0, -0.05, 0.1)
    earR.add(innerR)
    headGroup.add(earR)

    // Snout & Pink Nose
    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.32, 20, 16), whiteFurMat)
    muzzle.scale.set(1.25, 0.7, 0.6)
    muzzle.position.set(0, -0.18, 0.95)
    headGroup.add(muzzle)

    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.09, 3), nosePinkMat)
    nose.scale.set(1.2, 1, 0.8)
    nose.rotation.set(Math.PI, 0, 0)
    nose.position.set(0, -0.08, 1.06)
    headGroup.add(nose)

    // Blush Cheeks
    const blushGeo = new THREE.CircleGeometry(0.18, 20)
    const blushMat = new THREE.MeshBasicMaterial({
      color: 0xff6b8b,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    })
    const blushL = new THREE.Mesh(blushGeo, blushMat)
    blushL.position.set(-0.58, -0.22, 0.92)
    blushL.rotation.y = -0.45
    headGroup.add(blushL)

    const blushR = new THREE.Mesh(blushGeo, blushMat)
    blushR.position.set(0.58, -0.22, 0.92)
    blushR.rotation.y = 0.45
    headGroup.add(blushR)

    const eyeSocketGeo = new THREE.SphereGeometry(0.29, 24, 20)
    const irisGeo = new THREE.SphereGeometry(0.19, 20, 16)
    irisGeo.scale(1.0, 1.0, 0.35)
    const pupilGeo = new THREE.SphereGeometry(0.1, 16, 12)
    pupilGeo.scale(0.85, 1.15, 0.3)
    const catchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const eyelidGeo = new THREE.SphereGeometry(0.31, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)

    // Left Eye
    const leftEyeGroup = new THREE.Group()
    leftEyeGroup.position.set(-0.43, 0.05, 0.88)
    leftEyeGroup.add(new THREE.Mesh(eyeSocketGeo, scleraMat))

    const leftIris = new THREE.Mesh(irisGeo, sapphireIrisMat)
    leftIris.position.set(0, 0, 0.22)
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat)
    leftPupil.position.set(0, 0, 0.08)
    leftIris.add(leftPupil)

    const c1 = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), catchlightMat)
    c1.position.set(-0.06, 0.07, 0.12)
    leftIris.add(c1)
    leftEyeGroup.add(leftIris)
    mascot3D.current.leftEyeIris = leftIris

    const leftEyelid = new THREE.Mesh(eyelidGeo, eyelidMat)
    leftEyelid.rotation.x = -Math.PI / 2
    leftEyeGroup.add(leftEyelid)
    mascot3D.current.leftEyelid = leftEyelid
    headGroup.add(leftEyeGroup)

    // Right Eye
    const rightEyeGroup = new THREE.Group()
    rightEyeGroup.position.set(0.43, 0.05, 0.88)
    rightEyeGroup.add(new THREE.Mesh(eyeSocketGeo, scleraMat))

    const rightIris = new THREE.Mesh(irisGeo, sapphireIrisMat)
    rightIris.position.set(0, 0, 0.22)
    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat)
    rightPupil.position.set(0, 0, 0.08)
    rightIris.add(rightPupil)

    const c2 = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), catchlightMat)
    c2.position.set(-0.06, 0.07, 0.12)
    rightIris.add(c2)
    rightEyeGroup.add(rightIris)
    mascot3D.current.rightEyeIris = rightIris

    const rightEyelid = new THREE.Mesh(eyelidGeo, eyelidMat)
    rightEyelid.rotation.x = -Math.PI / 2
    rightEyeGroup.add(rightEyelid)
    mascot3D.current.rightEyelid = rightEyelid
    headGroup.add(rightEyeGroup)

    // Feline Winged Eyeliner
    const eyelinerGeo = new THREE.TorusGeometry(0.28, 0.026, 12, 32, Math.PI * 0.9)
    const eyelinerMat = new THREE.MeshBasicMaterial({ color: 0x09090b })
    const eyelinerL = new THREE.Mesh(eyelinerGeo, eyelinerMat)
    eyelinerL.rotation.set(-0.25, 0.1, 0.65)
    eyelinerL.position.set(-0.43, 0.12, 0.91)
    headGroup.add(eyelinerL)

    const eyelinerR = new THREE.Mesh(eyelinerGeo, eyelinerMat)
    eyelinerR.rotation.set(-0.25, -0.1, -0.65)
    eyelinerR.position.set(0.43, 0.12, 0.91)
    headGroup.add(eyelinerR)

    // Glasses Group
    const glassesGroup = new THREE.Group()
    glassesGroup.position.set(0, 0.05, 0.99)
    headGroup.add(glassesGroup)
    mascot3D.current.glassesGroup = glassesGroup

    const glassFrameMat = new THREE.MeshStandardMaterial({
      color: 0x0a0f1d,
      roughness: 0.2,
      metalness: 0.8,
    })
    const glassLensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 0.82,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      reflectivity: 0.85,
    })

    const rimGeo = new THREE.TorusGeometry(0.36, 0.045, 16, 48)
    const leftRim = new THREE.Mesh(rimGeo, glassFrameMat)
    leftRim.position.set(-0.44, 0, 0)
    glassesGroup.add(leftRim)

    const rightRim = new THREE.Mesh(rimGeo, glassFrameMat)
    rightRim.position.set(0.44, 0, 0)
    glassesGroup.add(rightRim)

    const lensGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.02, 32)
    lensGeo.rotateX(Math.PI / 2)
    const lensL = new THREE.Mesh(lensGeo, glassLensMat)
    lensL.position.set(-0.44, 0, 0)
    glassesGroup.add(lensL)

    const lensR = new THREE.Mesh(lensGeo, glassLensMat)
    lensR.position.set(0.44, 0, 0)
    glassesGroup.add(lensR)

    const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.26, 12), glassFrameMat)
    bridge.rotateZ(Math.PI / 2)
    bridge.position.set(0, 0.05, 0.02)
    glassesGroup.add(bridge)

    // Twin Navy Flowers on Ears
    const flowersGroup = new THREE.Group()
    headGroup.add(flowersGroup)
    mascot3D.current.flowersGroup = flowersGroup

    const createFlower = (x: number, y: number, z: number, rotZ: number, scale = 1) => {
      const flw = new THREE.Group()
      flw.position.set(x, y, z)
      flw.rotation.z = rotZ
      flw.scale.setScalar(scale)

      const petalMat = new THREE.MeshStandardMaterial({ color: 0x0f2a6b, roughness: 0.3 })
      const centerMat = new THREE.MeshStandardMaterial({ color: 0x8aa4ee, roughness: 0.2 })

      for (let i = 0; i < 5; i++) {
        const petal = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), petalMat)
        petal.scale.set(1.2, 0.6, 0.6)
        const ang = (i * Math.PI * 2) / 5
        petal.position.set(Math.cos(ang) * 0.065, Math.sin(ang) * 0.065, 0)
        petal.rotation.z = ang
        flw.add(petal)
      }
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), centerMat)
      center.position.z = 0.02
      flw.add(center)
      return flw
    }

    flowersGroup.add(createFlower(-0.54, 0.76, 0.75, 0.2, 1.15))
    flowersGroup.add(createFlower(-0.38, 0.86, 0.74, -0.4, 0.95))
    flowersGroup.add(createFlower(0.54, 0.76, 0.75, -0.2, 1.15))
    flowersGroup.add(createFlower(0.38, 0.86, 0.74, 0.4, 0.95))

    const handleResize = () => {
      if (!containerRef.current || !mascot3D.current.camera || !mascot3D.current.renderer) return
      const w = containerRef.current.clientWidth
      const h = containerRef.current.clientHeight
      mascot3D.current.camera.aspect = w / h
      mascot3D.current.camera.updateProjectionMatrix()
      mascot3D.current.renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    const timer = new THREE.Timer()
    let blinkTimer = 0
    let nextBlinkTime = 3.2
    let isBlinking = false
    let blinkProg = 0
    let frameId = 0

    const animate = (timestamp?: number) => {
      frameId = requestAnimationFrame(animate)
      timer.update(timestamp)
      const delta = timer.getDelta()
      const elapsed = timer.getElapsed()

      const {
        targetPointer,
        smoothPointer,
        headGroup,
        leftEyeIris,
        rightEyeIris,
        leftEyelid,
        rightEyelid,
        glassesGroup,
        catRoot,
        tailSegments,
      } = mascot3D.current

      // 1. Smooth Pointer Interpolation
      smoothPointer.x += (targetPointer.x - smoothPointer.x) * 0.08
      smoothPointer.y += (targetPointer.y - smoothPointer.y) * 0.08

      // 2. Head Orientation & Subtle Tilting
      if (headGroup) {
        headGroup.rotation.y = smoothPointer.x * 0.42
        headGroup.rotation.x = -smoothPointer.y * 0.32 + mascot3D.current.headNodAngle
        headGroup.rotation.z = -smoothPointer.x * 0.1
      }

      // 3. Iris 3D Gaze Tracking
      const eyeLimit = 0.06
      const eyeX = THREE.MathUtils.clamp(smoothPointer.x * 0.07, -eyeLimit, eyeLimit)
      const eyeY = THREE.MathUtils.clamp(smoothPointer.y * 0.07, -eyeLimit, eyeLimit)

      if (leftEyeIris && rightEyeIris) {
        leftEyeIris.position.x = eyeX
        leftEyeIris.position.y = eyeY
        rightEyeIris.position.x = eyeX
        rightEyeIris.position.y = eyeY
      }

      // 4. Procedural Eye Blinking & Wink
      blinkTimer += delta
      if (blinkTimer > nextBlinkTime && !isBlinking && !mascot3D.current.isWinking) {
        isBlinking = true
        blinkProg = 0
      }

      if (isBlinking && leftEyelid && rightEyelid) {
        blinkProg += delta * 14
        const angle = Math.sin(blinkProg) * (Math.PI / 2)

        if (blinkProg >= Math.PI) {
          isBlinking = false
          blinkTimer = 0
          nextBlinkTime = 2.8 + Math.random() * 3.5
          leftEyelid.rotation.x = -Math.PI / 2
          rightEyelid.rotation.x = -Math.PI / 2
        } else {
          leftEyelid.rotation.x = -Math.PI / 2 + angle
          rightEyelid.rotation.x = -Math.PI / 2 + angle
        }
      }

      // 5. Tail Sinusoidal Wagging
      if (tailSegments) {
        const speed = tailSpeed === 'fast' ? 5.2 : tailSpeed === 'gentle' ? 1.8 : 3.2
        tailSegments.forEach((seg, i) => {
          seg.rotation.z = Math.sin(elapsed * speed + i * 0.4) * 0.16
          seg.rotation.y = Math.cos(elapsed * speed + i * 0.3) * 0.1
        })
      }

      // 6. Glasses Tilt Interpolation
      if (glassesGroup) {
        glassesGroup.rotation.z = THREE.MathUtils.lerp(
          glassesGroup.rotation.z,
          mascot3D.current.glassesTilt,
          0.1,
        )
      }

      // 7. Squish Spring Relaxation
      if (catRoot) {
        mascot3D.current.squishScale = THREE.MathUtils.lerp(
          mascot3D.current.squishScale,
          1.0,
          0.09,
        )
        catRoot.scale.set(
          1 / Math.sqrt(mascot3D.current.squishScale),
          mascot3D.current.squishScale,
          1 / Math.sqrt(mascot3D.current.squishScale),
        )

        // Idle Breathing
        const breath = Math.sin(elapsed * 2.2) * 0.015
        catRoot.position.y = -0.22 + breath
      }

      // Nod relaxation
      mascot3D.current.headNodAngle = THREE.MathUtils.lerp(
        mascot3D.current.headNodAngle,
        0,
        0.1,
      )

      // Render
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
    }
    // The scene is built once from the initial suit theme; theme swaps update materials.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update Suit Theme
  useEffect(() => {
    const mats = mascot3D.current.materials
    if (!mats.jacket || !mats.lapel || !mats.tie || !mats.tieStripe) return
    mats.jacket.color.setHex(suitTheme.jacketColor)
    mats.lapel.color.setHex(suitTheme.lapelColor)
    mats.tie.color.setHex(suitTheme.tieColor)
    mats.tieStripe.color.setHex(suitTheme.tieStripeColor)
  }, [suitTheme])

  // Update Glasses Visibility
  useEffect(() => {
    if (mascot3D.current.glassesGroup) {
      mascot3D.current.glassesGroup.visible = hasGlasses
    }
  }, [hasGlasses])

  // Update Flowers Visibility
  useEffect(() => {
    if (mascot3D.current.flowersGroup) {
      mascot3D.current.flowersGroup.visible = hasFlowers
    }
  }, [hasFlowers])

  // Update Mood Sleepiness
  useEffect(() => {
    const { leftEyelid, rightEyelid } = mascot3D.current
    if (!leftEyelid || !rightEyelid) return

    if (mood === 'sleepy') {
      leftEyelid.rotation.x = 0
      rightEyelid.rotation.x = 0
    } else {
      leftEyelid.rotation.x = -Math.PI / 2
      rightEyelid.rotation.x = -Math.PI / 2
    }

    if (mood === 'surprised') setTailSpeed('fast')
    else if (mood === 'sleepy') setTailSpeed('gentle')
    else setTailSpeed('normal')
  }, [mood])

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)

    if (mascot3D.current.isOrbiting && mascot3D.current.camera) {
      const deltaX = e.clientX - mascot3D.current.lastMouseX
      const deltaY = e.clientY - mascot3D.current.lastMouseY
      mascot3D.current.lastMouseX = e.clientX
      mascot3D.current.lastMouseY = e.clientY

      mascot3D.current.orbitTheta -= deltaX * 0.007
      mascot3D.current.orbitPhi = THREE.MathUtils.clamp(
        mascot3D.current.orbitPhi + deltaY * 0.007,
        -0.3,
        0.5,
      )

      const radius = 5
      const cam = mascot3D.current.camera
      cam.position.x = radius * Math.sin(mascot3D.current.orbitTheta) * Math.cos(mascot3D.current.orbitPhi)
      cam.position.z = radius * Math.cos(mascot3D.current.orbitTheta) * Math.cos(mascot3D.current.orbitPhi)
      cam.position.y = 0.5 + radius * Math.sin(mascot3D.current.orbitPhi)
      cam.lookAt(0, 0.2, 0)
    } else {
      mascot3D.current.targetPointer.x = x
      mascot3D.current.targetPointer.y = y
    }
  }

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    mascot3D.current.isOrbiting = true
    mascot3D.current.lastMouseX = e.clientX
    mascot3D.current.lastMouseY = e.clientY
  }

  const handlePointerUp = () => {
    mascot3D.current.isOrbiting = false
  }

  // Pet Head Reaction
  const handlePetCat = (e: ReactMouseEvent) => {
    audio.playPurr()
    setMood('purr')
    triggerNewQuote('purr')
    mascot3D.current.squishScale = 0.88 // Satisfying squish spring
    mascot3D.current.headNodAngle = 0.12

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top
      const newHeart = { id: Date.now() + Math.random(), x: clickX, y: clickY }
      setPetHearts((prev) => [...prev.slice(-6), newHeart])
      setTimeout(() => {
        setPetHearts((prev) => prev.filter((h) => h.id !== newHeart.id))
      }, 1200)
    }
  }

  // Tilt Glasses
  const handleGlassesTilt = () => {
    audio.playGlassesChime()
    setMood('proud')
    triggerNewQuote('proud')
    mascot3D.current.glassesTilt = mascot3D.current.glassesTilt === 0 ? -0.12 : 0
  }

  // Handshake Paws
  const handlePawsTap = () => {
    audio.playTap()
    setMood('boss')
    triggerNewQuote('boss')
    mascot3D.current.headNodAngle = -0.15
  }

  // Playful Wink
  const handleWink = () => {
    audio.playMeow()
    if (mascot3D.current.rightEyelid) {
      mascot3D.current.isWinking = true
      mascot3D.current.rightEyelid.rotation.x = 0
      setTimeout(() => {
        if (mascot3D.current.rightEyelid && mood !== 'sleepy') {
          mascot3D.current.rightEyelid.rotation.x = -Math.PI / 2
        }
        mascot3D.current.isWinking = false
      }, 400)
    }
  }

  const resetCamera = () => {
    if (!mascot3D.current.camera) return
    mascot3D.current.orbitTheta = 0
    mascot3D.current.orbitPhi = 0.08
    mascot3D.current.camera.position.set(0, 0.5, 5)
    mascot3D.current.camera.lookAt(0, 0.2, 0)
  }

  const copyCode = () => {
    void navigator.clipboard.writeText('// Mascot ready for production — built with Three.js + React.')
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const moodButton = (active: boolean) =>
    [
      'btn-brutal px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink',
      active ? 'bg-jam text-ink-solid' : 'bg-card',
    ].join(' ')

  return (
    <div className="relative w-full select-none">
      {/* flat deco — checker whispers + solid slabs behind the cat */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-soft absolute inset-0 opacity-60" />
        <div className="absolute -right-6 -top-6 h-24 w-24 border-2 border-ink bg-jam shadow-brutal" />
        <div className="absolute -left-6 bottom-16 h-16 w-16 border-2 border-ink bg-sky shadow-brutal" />
      </div>

      {/* Header bar */}
      <header className="relative z-10 w-full border-2 border-ink bg-card shadow-brutal">
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2.5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center border-2 border-ink bg-navy font-black text-on-navy shadow-brutal-sm">
              🐾
            </span>
            <div className="min-w-0">
              <span className="flex items-center gap-2 font-display text-sm uppercase leading-none tracking-tight text-ink">
                Madame Fluffington 3D
                <span className="hidden whitespace-nowrap border-2 border-ink bg-sky px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-solid shadow-brutal-sm sm:inline-block">
                  Executive CEO
                </span>
              </span>
              <p className="mt-1 truncate font-mono text-[10px] font-bold uppercase tracking-widest text-ink">
                3D procedural interactive mascot
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              aria-pressed={soundEnabled}
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
              title={soundEnabled ? 'Mute sound' : 'Enable sound'}
              className="grid h-8 w-8 place-items-center border-2 border-ink bg-paper text-ink shadow-brutal-sm transition-colors hover:bg-navy hover:text-on-navy"
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>
            <button
              type="button"
              onClick={() => setShowSparkles(!showSparkles)}
              aria-pressed={showSparkles}
              aria-label="Toggle sparkles"
              title="Toggle sparkles"
              className={`grid h-8 w-8 place-items-center border-2 border-ink text-ink shadow-brutal-sm transition-colors hover:bg-navy ${
                showSparkles ? 'bg-navy text-on-navy' : 'bg-paper text-ink'
              }`}
            >
              <Sparkles size={14} />
            </button>
            <button
              type="button"
              onClick={resetCamera}
              aria-label="Reset 3D camera"
              title="Reset 3D camera"
              className="hidden h-8 w-8 place-items-center border-2 border-ink bg-paper text-ink shadow-brutal-sm transition-colors hover:bg-navy hover:text-on-navy sm:grid"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Executive Memo Speech Bubble */}
      <button
        type="button"
        onClick={() => triggerNewQuote()}
        className="btn-brutal group relative z-10 mt-4 w-full cursor-pointer bg-navy px-4 py-3 text-left"
      >
        <span className="flex items-start gap-2.5">
          <span className="text-lg leading-none">💼</span>
          <span className="min-w-0 flex-1">
            <span className="mb-0.5 block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-on-navy">
              Executive memo — click for another
            </span>
            <span className="block text-sm font-semibold italic leading-relaxed text-on-navy">{quote}</span>
          </span>
          <RefreshCw
            size={14}
            className="mt-0.5 shrink-0 text-ink-solid transition-transform duration-500 group-hover:rotate-180"
          />
        </span>
      </button>

      {/* 3D Viewport */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClick={handlePetCat}
        style={{ touchAction: 'pan-y' }}
        className="relative z-10 mx-auto mt-4 h-72 w-72 cursor-grab overflow-hidden border-4 border-ink bg-paper shadow-brutal-lg active:cursor-grabbing sm:h-80 sm:w-80"
        aria-label="3D mascot — move to track gaze, drag to rotate, click to pet"
      >
        {/* Floating Purr Hearts */}
        {petHearts.map((h) => (
          <div
            key={h.id}
            className="animate-float-heart pointer-events-none absolute z-30 flex items-center gap-1 font-bold text-xs"
            style={{ left: h.x, top: h.y }}
          >
            <Heart size={20} fill="#EC4899" className="text-jam" />
            <span className="rounded-none border-2 border-ink bg-card px-1 py-0.5 text-xs text-ink">Purr!</span>
          </div>
        ))}

        {/* Three.js Canvas (alpha) */}
        <canvas ref={canvasRef} className="block h-full w-full" />

        {/* corner hint */}
        <span className="pointer-events-none absolute right-2 top-2 border-2 border-ink bg-card px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow-brutal-sm">
          pet me
        </span>
      </div>

      {/* Mood buttons */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <button type="button" onClick={handlePetCat} className={moodButton(mood === 'purr')}>
          <Heart size={14} />
          Pet / Purr
        </button>
        <button
          type="button"
          onClick={handlePawsTap}
          className={moodButton(mood === 'boss').replace('bg-jam text-ink-solid', mood === 'boss' ? 'bg-sky text-ink-solid' : '')}
        >
          <Briefcase size={14} />
          Boss Mode
        </button>
        <button
          type="button"
          onClick={handleGlassesTilt}
          className={moodButton(mood === 'proud').replace('bg-jam text-ink-solid', mood === 'proud' ? 'bg-grape text-ink-solid' : '')}
        >
          <Glasses size={14} />
          Tilt Glasses
        </button>
        <button
          type="button"
          onClick={() => {
            setMood('sleepy')
            triggerNewQuote('sleepy')
          }}
          className={moodButton(mood === 'sleepy').replace('bg-jam text-ink-solid', mood === 'sleepy' ? 'bg-ink text-paper' : '')}
        >
          <Moon size={14} />
          Cat Nap
        </button>
        <button
          type="button"
          onClick={handleWink}
          className="btn-brutal bg-card px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink"
        >
          😉 Wink
        </button>
      </div>

      {/* Customizer panel */}
      <footer className="relative z-10 mt-4 w-full border-2 border-ink bg-card p-3.5 shadow-brutal">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {/* Suit Wardrobe */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
              <Palette size={14} className="text-jam" />
              Wardrobe suit
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {SUIT_THEMES_3D.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => {
                    audio.playTap()
                    setSuitTheme(theme)
                  }}
                  title={theme.name}
                  aria-label={`${theme.name} suit`}
                  className={`h-7 w-7 border-2 border-ink transition-transform hover:scale-110 ${
                    suitTheme.id === theme.id ? 'shadow-brutal scale-110' : ''
                  }`}
                  style={{ backgroundColor: hex(theme.jacketColor) }}
                />
              ))}
              <span className="truncate font-mono text-[11px] font-bold uppercase text-ink">{suitTheme.name}</span>
            </div>
          </div>

          {/* Glasses Toggle */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
              <Glasses size={14} />
              Glasses
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  audio.playGlassesChime()
                  setHasGlasses(!hasGlasses)
                }}
                aria-pressed={hasGlasses}
                className={`btn-brutal px-2.5 py-1 font-mono text-[11px] font-bold uppercase ${
                  hasGlasses ? 'bg-ink text-paper' : 'bg-paper text-ink'
                }`}
              >
                {hasGlasses ? 'Equipped' : 'None'}
              </button>
              {hasGlasses ? (
                <button
                  type="button"
                  onClick={handleGlassesTilt}
                  className="btn-brutal bg-navy px-2.5 py-1 font-mono text-[11px] font-bold uppercase text-on-navy"
                >
                  Tilt
                </button>
              ) : null}
            </div>
          </div>

          {/* Floral Ear Clips Toggle */}
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
              <Flower2 size={14} className="text-navy dark:text-navy-soft" />
              Ear pins
            </span>
            <button
              type="button"
              onClick={() => {
                audio.playTap()
                setHasFlowers(!hasFlowers)
              }}
              aria-pressed={hasFlowers}
              className={`btn-brutal w-max px-2.5 py-1 font-mono text-[11px] font-bold uppercase ${
                hasFlowers ? 'bg-jam text-ink-solid' : 'bg-paper text-ink'
              }`}
            >
              {hasFlowers ? 'Navy blossoms' : 'Hidden'}
            </button>
          </div>

          {/* Pro tip & Code copy */}
          <div className="flex flex-col justify-center border-2 border-ink bg-paper p-2.5">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">3D interactive</span>
              <button
                type="button"
                onClick={copyCode}
                className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink transition-colors hover:bg-navy hover:text-on-navy"
              >
                {copiedCode ? <Check size={12} /> : <Copy size={12} />}
                {copiedCode ? 'Copied!' : 'Copy TSX'}
              </button>
            </div>
            <p className="font-mono text-[11px] leading-tight text-ink">
              Move cursor to track gaze, drag to rotate the 3D view, click to pet!
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Hearts Keyframe Styles */}
      <style>{`
        @keyframes floatHeart {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(-75px) scale(1.3);
          }
        }
        .animate-float-heart {
          animation: floatHeart 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  )
}