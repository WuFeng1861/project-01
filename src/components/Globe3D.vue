<template>
  <div ref="container" class="globe-container">
    <div class="globe-overlay">
      <div class="legend">
        <div class="legend-item">
          <span class="dot online"></span>
          <span>在线节点</span>
        </div>
        <div class="legend-item">
          <span class="dot offline"></span>
          <span>离线节点</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRafFn } from '@vueuse/core'
import * as THREE from 'three'

const props = defineProps({
  nodes: {
    type: Array,
    required: true
  }
})

const container = ref(null)
let scene, camera, renderer, globe, nodePoints

// 地理坐标转换为3D坐标
const geoCoords = {
  CN: { lat: 35.86166, lng: 104.195397 },
  US: { lat: 37.09024, lng: -95.712891 },
  JP: { lat: 36.204824, lng: 138.252924 },
  SG: { lat: 1.352083, lng: 103.819836 },
  DE: { lat: 51.165691, lng: 10.451526 },
  GB: { lat: 55.378051, lng: -3.435973 }
}

function latLngToVector3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

function initScene() {
  scene = new THREE.Scene()
  
  // 相机设置
  camera = new THREE.PerspectiveCamera(45, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.z = 250
  
  // 渲染器设置
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)
  
  // 创建地球
  const geometry = new THREE.SphereGeometry(100, 64, 64)
  const material = new THREE.MeshBasicMaterial({
    color: 0xb4ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  })
  globe = new THREE.Mesh(geometry, material)
  scene.add(globe)
  
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xb4ff00, 0.1)
  scene.add(ambientLight)
  
  // 添加点光源增强线框效果
  const pointLight = new THREE.PointLight(0xb4ff00, 0.2)
  pointLight.position.set(100, 100, 100)
  scene.add(pointLight)
  
  updateNodes()
}

function updateNodes() {
  // 清除现有节点
  if (nodePoints) {
    scene.remove(nodePoints)
  }
  
  const positions = []
  const colors = []
  const color = new THREE.Color()
  
  props.nodes.forEach(node => {
    const coords = geoCoords[node.regionCode]
    if (coords) {
      const position = latLngToVector3(coords.lat, coords.lng, 102)
      positions.push(position.x, position.y, position.z)
      
      if (node.online) {
        color.setStyle('#b4ff00')
      } else {
        color.setStyle('#ff3333')
      }
      colors.push(color.r, color.g, color.b)
    }
  })
  
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  
  const material = new THREE.PointsMaterial({
    size: 4,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
  })
  
  nodePoints = new THREE.Points(geometry, material)
  scene.add(nodePoints)
}

// 动画循环
const { pause, resume } = useRafFn(() => {
  if (globe) {
    globe.rotation.y += 0.001
    if (nodePoints) {
      nodePoints.rotation.y += 0.001
    }
    renderer.render(scene, camera)
  }
})

// 监听窗口大小变化
function onResize() {
  if (camera && renderer && container.value) {
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  }
}

// 监听节点变化
watch(() => props.nodes, updateNodes, { deep: true })

onMounted(() => {
  initScene()
  window.addEventListener('resize', onResize)
  resume()
})

onBeforeUnmount(() => {
  pause()
  window.removeEventListener('resize', onResize)
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<style scoped>
.globe-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: rgba(10, 10, 10, 0.8);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(180, 255, 0, 0.2);
}

.globe-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.legend {
  background: rgba(10, 10, 10, 0.8);
  padding: 10px;
  border-radius: 4px;
  border: 1px solid rgba(180, 255, 0, 0.2);
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 5px 0;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}

.dot.online {
  background: #b4ff00;
  box-shadow: 0 0 8px rgba(180, 255, 0, 0.4);
}

.dot.offline {
  background: #ff3333;
  box-shadow: 0 0 8px rgba(255, 51, 51, 0.4);
}
</style>