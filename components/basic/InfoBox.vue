<script setup lang="ts">
import InfoIcon from "@/assets/images/info.png"
import InfoIconDark from "@/assets/images/info-dark.png"

let inDarkMode = ref(false);
onMounted(() => {
  inDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
});
</script>

<template>
  <section class="info-box">
    <div class="img-container">
      <img class="img-icon" :src="InfoIconDark" alt="Icon indicating an import information" v-if="inDarkMode">
      <img class="img-icon" :src="InfoIcon" alt="Icon indicating an import information" v-else>
    </div>

    <h3><slot name="title" /></h3>
    
    <p><slot /></p>
  </section>
</template>

<style scoped>
.info-box {
  --icon-padding: 7.5px;
  --img-diameter: 25px;

  padding: 1rem;
  width: inherit;
  height: auto;
  border: var(--border-width) solid var(--border-std);
  border-radius: 1rem;
  margin: 2rem 0;
  text-align: justify;

  position: relative;
}

@media (max-width: 700px) {
  .info-box{
    --icon-padding: 4px;
    --img-diameter: 20px;

    padding: 0.5rem 1rem;
  }
}

.img-container {
  position: absolute;
  top: calc(-1 * (var(--icon-padding) + 1rem));
  padding: var(--icon-padding);
  background: var(--background-color);
  border-radius: 50%;
}

.img-icon {
  width: var(--img-diameter);
  height: var(--img-diameter);

  padding: 5px;
  border: var(--border-width) solid var(--border-std);
  border-radius: 50%;
}
</style>