<template>
  <div class="node-list">
    <StarryBackground />
    <div class="container">
      <h1 class="title">Merc节点状态 <span class="version">测试版0.57</span></h1>
      
      <div class="stats">
        <div class="stat-box">
          <span>总节点数：</span>
          <span class="value">{{ nodes.length }}</span>
        </div>
        <div class="stat-box">
          <span>在线节点：</span>
          <span class="value">{{ onlineNodes }}</span>
        </div>
        <div class="stat-box">
          <span>总质押量：</span>
          <span class="value">1.2kw MERC</span>
        </div>
      </div>

      <div class="filters">
        <select v-model="statusFilter">
          <option value="all">全部状态</option>
          <option value="online">在线</option>
          <option value="offline">离线</option>
        </select>
        <select v-model="regionFilter">
          <option value="all">全部地区</option>
          <option v-for="(name, code) in regions" :key="code" :value="code">
            {{ name }}
          </option>
        </select>
      </div>

      <Globe3D :nodes="nodes" />

      <div class="nodes-grid">
        <NodeCard 
          v-for="node in filteredNodes" 
          :key="node.id"
          :node="node"
          @click="goToSpeedTest(node.id)"
          @stake="handleStake"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import StarryBackground from '../components/StarryBackground.vue'
import NodeCard from '../components/NodeCard.vue'
import Globe3D from '../components/Globe3D.vue'

const router = useRouter()

const regions = {
  CN: '中国',
  US: '美国',
  JP: '日本',
  SG: '新加坡',
  DE: '德国',
  GB: '英国'
}

const nodes = ref(generateNodes())
const statusFilter = ref('all')
const regionFilter = ref('all')

const onlineNodes = computed(() => nodes.value.filter(n => n.online).length)

const filteredNodes = computed(() => {
  return nodes.value.filter(node => {
    const statusMatch = statusFilter.value === 'all' || 
      (statusFilter.value === 'online' && node.online) ||
      (statusFilter.value === 'offline' && !node.online)
    
    const regionMatch = regionFilter.value === 'all' || 
      node.regionCode === regionFilter.value
    
    return statusMatch && regionMatch
  })
})

function generateNodes() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: `node-${i + 1}`,
    number: i + 1,
    regionCode: Object.keys(regions)[Math.floor(Math.random() * Object.keys(regions).length)],
    online: Math.random() > 0.3,
    connections: Math.floor(Math.random() * 100),
    latency: Math.floor(Math.random() * 200),
    staked: Math.floor(Math.random() * 50000 + 50000) // 5-10万之间的质押量
  }))
}

function goToSpeedTest(nodeId) {
  router.push(`/speed-test/${nodeId}`)
}

function handleStake({ nodeId, amount }) {
  const node = nodes.value.find(n => n.id === nodeId)
  if (node) {
    node.staked = (node.staked || 0) + amount
  }
}
</script>

<style scoped>
.node-list {
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2em;
}

.version {
  font-size: 0.5em;
  opacity: 0.7;
}

.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.stat-box {
  background: rgba(180, 255, 0, 0.1);
  padding: 15px 20px;
  border-radius: 8px;
  flex: 1;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

select {
  background: rgba(180, 255, 0, 0.1);
  border: 1px solid rgba(180, 255, 0, 0.2);
  color: #b4ff00;
  padding: 10px;
  border-radius: 4px;
  flex: 1;
}

.nodes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
</style>