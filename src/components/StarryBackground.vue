<template>
  <div class="starry-background">
    <div v-for="star in stars" :key="star.id" class="star" :style="starStyle(star)"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stars: []
    }
  },
  mounted() {
    this.createStars()
    window.addEventListener('resize', this.createStars)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.createStars)
  },
  methods: {
    createStars() {
      const starCount = Math.floor(window.innerWidth * window.innerHeight / 8000)
      this.stars = Array.from({ length: starCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        blinkDuration: Math.random() * 3 + 2
      }))
    },
    starStyle(star) {
      return {
        left: `${star.x}%`,
        top: `${star.y}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        opacity: star.opacity,
        animation: `blink ${star.blinkDuration}s infinite`
      }
    }
  }
}
</script>

<style scoped>
.starry-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(circle at center, rgba(20, 20, 20, 0.8) 0%, rgba(10, 10, 10, 1) 100%);
}

.star {
  position: absolute;
  background-color: #b4ff00;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(180, 255, 0, 0.8);
}

@keyframes blink {
  0%, 100% { 
    opacity: 1;
    box-shadow: 0 0 4px rgba(180, 255, 0, 0.8);
  }
  50% { 
    opacity: 0.3;
    box-shadow: 0 0 2px rgba(180, 255, 0, 0.4);
  }
}
</style>