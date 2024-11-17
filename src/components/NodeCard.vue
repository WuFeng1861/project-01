<template>
  <div class="node-card">
    <div class="status-indicator" :class="{ online: node.online }"></div>
    <h3>节点 {{ node.number }}</h3>
    <div class="node-info">
      <div class="info-row">
        <span>地区</span>
        <span>{{ node.region }}</span>
      </div>
      <div class="info-row">
        <span>连接数</span>
        <span>{{ node.connections }}</span>
      </div>
      <div class="info-row">
        <span>延迟</span>
        <span>{{ node.latency }}ms</span>
      </div>
      <div class="info-row">
        <span>已质押</span>
        <span>{{ formatStake(node.staked) }} MERC</span>
      </div>
      <div class="stake-section">
        <input 
          type="number" 
          v-model="stakeAmount" 
          class="stake-input"
          placeholder="输入质押数量"
          min="0"
          step="0.1"
          @click.stop
        >
        <button 
          @click.stop="handleStake" 
          class="stake-button"
          :disabled="!canStake || !node.online"
        >
          质押
        </button>
      </div>
      <div v-if="showMessage" class="message" :class="messageType">
        {{ message }}
      </div>
      <div class="node-id">ID: {{ node.id }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTimeoutFn } from '@vueuse/core'

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['stake'])

const stakeAmount = ref('')
const message = ref('')
const messageType = ref('')
const showMessage = ref(false)

const { start: startMessageTimer } = useTimeoutFn(() => {
  showMessage.value = false
}, 3000)

const canStake = computed(() => {
  const amount = Number(stakeAmount.value)
  return amount > 0 && amount <= 1000 && !isNaN(amount)
})

function handleStake() {
  if (!props.node.online) {
    showError('节点离线，无法质押')
    return
  }
  
  if (!canStake.value) {
    showError('请输入0-1000之间的有效数量')
    return
  }

  showMessage.value = true
  messageType.value = 'info'
  message.value = '质押功能即将开启，敬请期待'
  startMessageTimer()
  
  stakeAmount.value = ''
}

function showError(msg) {
  message.value = msg
  messageType.value = 'error'
  showMessage.value = true
  startMessageTimer()
}

function formatStake(value) {
  const amount = Number(value || 0)
  return amount >= 10000 ? `${(amount / 10000).toFixed(1)}w` : amount.toFixed(1)
}
</script>

<style scoped>
.node-card {
  background: linear-gradient(145deg, rgba(10, 10, 10, 0.9), rgba(20, 20, 20, 0.9));
  border-radius: 12px;
  padding: 20px;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  border: 1px solid rgba(180, 255, 0, 0.1);
  cursor: pointer;
}

.node-card:hover {
  box-shadow: 0 8px 25px rgba(180, 255, 0, 0.15);
  border-color: rgba(180, 255, 0, 0.2);
  transform: translateY(-2px);
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ff3333;
  position: absolute;
  top: 20px;
  right: 20px;
  box-shadow: 0 0 15px rgba(255, 51, 51, 0.5);
}

.status-indicator.online {
  background-color: #b4ff00;
  box-shadow: 0 0 15px rgba(180, 255, 0, 0.5);
}

h3 {
  font-size: 1.2em;
  margin-bottom: 15px;
  color: #b4ff00;
  text-shadow: 0 0 10px rgba(180, 255, 0, 0.3);
}

.node-info {
  margin-top: 15px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(180, 255, 0, 0.1);
}

.stake-section {
  display: flex;
  gap: 10px;
  margin: 15px 0;
}

.stake-input {
  flex: 1;
  background: rgba(180, 255, 0, 0.1);
  border: 1px solid rgba(180, 255, 0, 0.2);
  border-radius: 4px;
  padding: 8px;
  color: #b4ff00;
  font-size: 0.9em;
}

.stake-input:focus {
  outline: none;
  border-color: rgba(180, 255, 0, 0.4);
  box-shadow: 0 0 10px rgba(180, 255, 0, 0.1);
}

.stake-button {
  background: rgba(180, 255, 0, 0.2);
  border: 1px solid rgba(180, 255, 0, 0.3);
  color: #b4ff00;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.stake-button:hover:not(:disabled) {
  background: rgba(180, 255, 0, 0.3);
  border-color: rgba(180, 255, 0, 0.4);
}

.stake-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message {
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
  font-size: 0.9em;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.message.error {
  background: rgba(255, 51, 51, 0.1);
  border: 1px solid rgba(255, 51, 51, 0.3);
  color: #ff3333;
}

.message.info {
  background: rgba(180, 255, 0, 0.1);
  border: 1px solid rgba(180, 255, 0, 0.3);
  color: #b4ff00;
}

.node-id {
  font-size: 0.8em;
  opacity: 0.7;
  margin-top: 10px;
  text-align: right;
  color: rgba(180, 255, 0, 0.7);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>