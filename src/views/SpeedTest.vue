<template>
  <div class="speed-test">
    <div class="container">
      <div class="header">
        <button class="back-button" @click="goBack">
          ← 返回节点列表
        </button>
        <h1 class="title">MERC水星节点分析 - {{ nodeId }}</h1>
      </div>

      <div class="stats-grid">
        <div class="stat-box">
          <h3>节点延迟</h3>
          <div class="value">{{ stats.latency }}<span class="unit">ms</span></div>
        </div>
        <div class="stat-box">
          <h3>节点健康度</h3>
          <div class="value">{{ stats.health }}<span class="unit">%</span></div>
        </div>
        <div class="stat-box">
          <h3>对等节点数</h3>
          <div class="value">{{ stats.peers }}<span class="unit">个</span></div>
        </div>
      </div>

      <div class="control-panel">
        <button 
          class="test-button" 
          @click="startSpeedTest"
          :disabled="testing"
        >
          {{ testing ? '测试中...' : '开始测试' }}
        </button>
        <div class="status-box">
          <div class="status-text">{{ statusText }}</div>
          <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <div class="history-chart">
        <h2>节点性能历史记录</h2>
        <div class="chart">
          <div class="chart-label">节点健康度 (%)</div>
          <div class="chart-content">
            <div 
              v-for="(value, index) in healthHistory" 
              :key="index"
              class="chart-bar"
              :style="{ height: `${value * 100}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      nodeId: this.id,
      stats: {
        latency: 0,
        health: 0,
        peers: 0
      },
      progress: 0,
      statusText: '等待测试...',
      healthHistory: Array(30).fill(0),
      testInterval: null,
      testing: false
    }
  },
  beforeUnmount() {
    this.stopTest()
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    startSpeedTest() {
      if (this.testing) return
      
      this.testing = true
      this.progress = 0
      this.statusText = '测试中...'
      let testCount = 0
      
      this.stopTest()
      
      this.testInterval = setInterval(() => {
        testCount++
        this.progress = Math.min((testCount / 20) * 100, 100)
        
        // 模拟测速数据
        this.stats.latency = Math.floor(Math.random() * 200)
        this.stats.health = Math.floor(Math.random() * 100)
        this.stats.peers = Math.floor(Math.random() * 50)
        
        // 更新历史记录
        this.healthHistory.shift()
        this.healthHistory.push(this.stats.health / 100)
        
        if (testCount >= 20) {
          this.stopTest()
          this.statusText = '测试完成'
          this.testing = false
        }
      }, 1000)
    },
    stopTest() {
      if (this.testInterval) {
        clearInterval(this.testInterval)
        this.testInterval = null
      }
    }
  }
}
</script>

<style scoped>
.speed-test {
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #b4ff00;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: 40px;
}

.back-button {
  background: none;
  border: 1px solid #b4ff00;
  color: #b4ff00;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.back-button:hover {
  background: rgba(180, 255, 0, 0.1);
}

.title {
  font-size: 2em;
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}

.stat-box {
  background-color: rgba(180, 255, 0, 0.05);
  border: 1px solid #b4ff00;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.stat-box h3 {
  margin: 0 0 10px 0;
  font-size: 1.2em;
}

.value {
  font-size: 2.5em;
  font-weight: bold;
}

.unit {
  font-size: 0.5em;
  margin-left: 5px;
}

.control-panel {
  margin-bottom: 40px;
}

.test-button {
  background: #b4ff00;
  color: #0a0a0a;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  transition: opacity 0.3s;
}

.test-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status-box {
  background-color: rgba(180, 255, 0, 0.05);
  border: 1px solid #b4ff00;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.status-text {
  margin-bottom: 10px;
}

.progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: #b4ff00;
  transition: width 0.3s ease;
}

.history-chart {
  background-color: rgba(180, 255, 0, 0.05);
  border: 1px solid #b4ff00;
  border-radius: 8px;
  padding: 20px;
}

.chart {
  height: 200px;
  margin-top: 20px;
  position: relative;
}

.chart-label {
  position: absolute;
  left: -40px;
  top: 50%;
  transform: rotate(-90deg) translateX(50%);
  transform-origin: left center;
}

.chart-content {
  height: 100%;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  padding-left: 40px;
}

.chart-bar {
  flex: 1;
  background-color: #b4ff00;
  transition: height 0.3s ease;
}
</style>