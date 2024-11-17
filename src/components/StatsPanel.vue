<template>
  <div class="stats">
    <div class="stat-box">
      <span>总节点数：</span>
      <span class="value">{{ total }}</span>
    </div>
    <div class="stat-box">
      <span>在线节点：</span>
      <span class="value">{{ online }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true
    },
    online: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.stats {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.stat-box {
  background-color: rgba(180, 255, 0, 0.05);
  padding: 15px 25px;
  border-radius: 8px;
  border: 1px solid rgba(180, 255, 0, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stat-box:hover {
  border-color: rgba(180, 255, 0, 0.4);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.value {
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 8px;
  color: #b4ff00;
  text-shadow: 0 0 10px rgba(180, 255, 0, 0.3);
}
</style>