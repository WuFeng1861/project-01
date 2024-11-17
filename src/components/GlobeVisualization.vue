<template>
  <div class="globe-container">
    <div class="legend">
      <h3>连接数图例</h3>
      <div class="legend-item">
        <div class="legend-dot small"></div>
        <span>小圆点: 1-30 连接</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot medium"></div>
        <span>中圆点: 31-70 连接</span>
      </div>
      <div class="legend-item">
        <div class="legend-dot large"></div>
        <span>大圆点: 71+ 连接</span>
      </div>
    </div>
    <div ref="globeContainer" class="globe"></div>
  </div>
</template>

<script>
// Script remains the same
export default {
  // ... existing script code ...
}
</script>

<style scoped>
.globe-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 40px;
  background-color: rgba(180, 255, 0, 0.05);
  border: 1px solid rgba(180, 255, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.globe {
  width: 100%;
  height: 100%;
}

.legend {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(10, 10, 10, 0.8);
  padding: 15px;
  border-radius: 8px;
  border: 1px solid rgba(180, 255, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

.legend h3 {
  margin-bottom: 10px;
  font-size: 1em;
  color: #b4ff00;
  text-shadow: 0 0 10px rgba(180, 255, 0, 0.3);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  opacity: 0.9;
}

.legend-dot {
  border-radius: 50%;
  background-color: #b4ff00;
  margin-right: 10px;
  box-shadow: 0 0 10px rgba(180, 255, 0, 0.3);
}

.legend-dot.small {
  width: 6px;
  height: 6px;
}

.legend-dot.medium {
  width: 10px;
  height: 10px;
}

.legend-dot.large {
  width: 14px;
  height: 14px;
}
</style>