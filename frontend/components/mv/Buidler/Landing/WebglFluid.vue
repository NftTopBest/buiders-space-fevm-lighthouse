<script setup lang="ts">
import WebGLFluid from 'webgl-fluid'
const canvas = $ref(null)

const defaultConfig = {
  IMMEDIATE: true, // Whether to trigger multiple random splats when initialized
  TRIGGER: 'hover', // Can be change to 'click'
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 1,
  VELOCITY_DISSIPATION: 0.3,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 5,
  SPLAT_RADIUS: 0.35,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BACK_COLOR: { r: 255, g: 255, b: 255 },
  TRANSPARENT: false,
  BLOOM: true,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 1.0,
}

const reinit = false
const webglFluidSettings = { color_type: 'simple', color: '#44249C', resolution: '128', velocity: '3', density: '3.04', pressure: '0.94', splat_radius: '0.11', backspace_animation: 'yes' }

let reDrawType, reDrawColor, reDrawResolution, reDrawVelocity, reDrawDensity, reDrawPressure, reDrawSplatRadius, reBackSpaceAnimation

const userConfig = {
  IMMEDIATE: false, // Whether to trigger multiple random splats when initialized
  TRIGGER: 'hover',
  SIM_RESOLUTION: reinit ? reDrawResolution : parseInt(webglFluidSettings.resolution),
  DYE_RESOLUTION: 512,
  DENSITY_DISSIPATION: reinit ? parseFloat(reDrawDensity) : parseFloat(webglFluidSettings.density),
  VELOCITY_DISSIPATION: reinit ? parseFloat(reDrawVelocity) : parseFloat(webglFluidSettings.velocity),
  PRESSURE: reinit ? parseFloat(reDrawPressure) : parseFloat(webglFluidSettings.pressure),
  PRESSURE_ITERATIONS: 20,
  CURL: 5,
  SPLAT_RADIUS: reinit ? parseFloat(reDrawSplatRadius) : parseFloat(webglFluidSettings.splat_radius),
  SHADING: true,
  COLORFUL: true,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  BLOOM: false,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8,
  BLOOM_THRESHOLD: 0.6,
  BLOOM_SOFT_KNEE: 0.7,
  POINTER_COLOR: [{ r: 0, g: 0, b: 0 }],
  SOUND_SENSITIVITY: 0,
  AUDIO_RESPONSIVE: false,
  FREQ_RANGE: 8,
  FREQ_RANGE_START: 0,
  TRANSPARENT: true,
  TYPE_COLOR: reinit ? reDrawType : webglFluidSettings.color_type,
  COLOR: reinit ? reDrawColor : webglFluidSettings.color,
  BACKSPACE_ANIMATION: reinit ? reBackSpaceAnimation : webglFluidSettings.backspace_animation,
}

let newEvent = null

const windowEvent = (event) => {
  newEvent = new event.constructor(
    event.type, event)
}

const documentEvent = (event) => {
  if (event.isTrusted && newEvent)
    document.getElementById('wgl-webgl-fluid').dispatchEvent(newEvent)
}

onMounted(() => {
  const config = {
    ...defaultConfig,
    ...userConfig,
  }
  WebGLFluid(canvas, config)

  window.addEventListener('mousemove', windowEvent)
  document.addEventListener('mousemove', documentEvent)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', windowEvent)
  document.removeEventListener('mousemove', documentEvent)
})
</script>
<template>
  <div id="wgl-canvas-outer" class="h-full w-full -z-1 fixed">
    <canvas id="wgl-webgl-fluid" ref="canvas" class=" fixed" style="width: 100vw; height:100vh;" />
  </div>
</template>
