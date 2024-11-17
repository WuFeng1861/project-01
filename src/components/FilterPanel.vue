<template>
  <div class="filters">
    <div class="filter-section">
      <h3>状态筛选</h3>
      <select v-model="localStatusFilter" @change="updateFilters">
        <option value="all">全部</option>
        <option value="online">在线</option>
        <option value="offline">离线</option>
      </select>
    </div>

    <div class="filter-section">
      <h3>地区筛选</h3>
      <select v-model="localRegionFilter" @change="updateFilters">
        <option value="all">全部地区</option>
        <option value="CN">中国</option>
        <option value="US">美国</option>
        <option value="JP">日本</option>
        <option value="SG">新加坡</option>
        <option value="DE">德国</option>
        <option value="GB">英国</option>
        <option value="CA">加拿大</option>
        <option value="AU">澳大利亚</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusFilter: String,
    regionFilter: String
  },
  data() {
    return {
      localStatusFilter: this.statusFilter,
      localRegionFilter: this.regionFilter
    }
  },
  methods: {
    updateFilters() {
      this.$emit('update:filters', {
        status: this.localStatusFilter,
        region: this.localRegionFilter
      })
    }
  }
}
</script>

<style scoped>
.filters {
  background-color: rgba(180, 255, 0, 0.05);
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  border: 1px solid rgba(180, 255, 0, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 15px;
}

.filter-section h3 {
  margin-bottom: 8px;
  color: #b4ff00;
  text-shadow: 0 0 10px rgba(180, 255, 0, 0.3);
}

select {
  background-color: rgba(26, 26, 26, 0.8);
  color: #b4ff00;
  border: 1px solid rgba(180, 255, 0, 0.2);
  padding: 12px;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b4ff00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

select:hover {
  border-color: rgba(180, 255, 0, 0.4);
  box-shadow: 0 0 10px rgba(180, 255, 0, 0.1);
}

select:focus {
  outline: none;
  border-color: rgba(180, 255, 0, 0.6);
  box-shadow: 0 0 15px rgba(180, 255, 0, 0.2);
}

@media (max-width: 768px) {
  .filters {
    grid-template-columns: 1fr;
  }
}
</style>