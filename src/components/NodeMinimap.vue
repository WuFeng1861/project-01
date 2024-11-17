<template>
  <div class="minimap">
    <h3 class="minimap-title">节点分布图</h3>
    <div class="map-container">
      <div 
        v-for="node in nodes" 
        :key="node.id" 
        class="node-dot"
        :class="{ 'is-online': node.online }"
        :style="getNodePosition(node)"
      >
        <div class="node-tooltip">
          {{ node.regionCode }} - {{ node.connections }}连接
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  nodes: {
    type: Array,
    required: true
  }
})

const regionPositions = {
  CN: { x: 75, y: 45 },
  US: { x: 20, y: 40 },
  JP: { x: 85, y: 40 },
  SG: { x: 75, y: 60 },
  DE: { x: 50, y: 35 },
  GB: { x: 45, y: 30 }
}

function getNodePosition(node) {
  const basePos = regionPositions[node.regionCode] || { x: 50, y: 50 }
  const randomOffset = () => (Math.random() - 0.5) * 5
  
  return {
    left: `${basePos.x + randomOffset()}%`,
    top: `${basePos.y + randomOffset()}%`
  }
}
</script>

<style scoped>
.minimap {
  background: rgba(180, 255, 0, 0.05);
  border: 1px solid rgba(180, 255, 0, 0.2);
  border-radius: 8px;
  padding: 20px;
  margin-top: 30px;
}

.minimap-title {
  text-align: center;
  margin-bottom: 15px;
  color: #b4ff00;
}

.map-container {
  position: relative;
  width: 100%;
  height: 200px;
  background: rgba(10, 10, 10, 0.5);
  border-radius: 4px;
}

.node-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 51, 51, 0.6);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.node-dot.is-online {
  background: rgba(180, 255, 0, 0.6);
  box-shadow: 0 0 8px rgba(180, 255, 0, 0.4);
}

.node-tooltip {
  position: absolute;
  background: rgba(10, 10, 10, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 1;
}

.node-dot:hover .node-tooltip {
  opacity: 1;
  transform: translateY(-20px);
}
</style>