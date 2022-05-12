<script setup lang="ts">
defineProps<{ ind: number }>();
</script>

<template>
  <div class="round" >
    <h4 class="inline">{{ ind }}. Runde</h4>
    <p class="inline">Wähle den besseren Wein</p>
    <NuxtLink :to="`/round/${ind}`">Runde starten</NuxtLink>
  </div>
</template>

<style scoped>
.round {
  padding: 0.5rem;
  border-top: var(--border-width) solid var(--border-std);
  margin: 0.5rem 0 0.5rem 0;
}

.round:first-of-type {
  border-top: 0;
}

h4 {
  margin: 0;
}

.inline {
  display: inline-block;
  margin: 0 5vw;
}

@media (max-width: 700px) {
  .inline {
    margin: 0 0.5rem;
  }
}
</style>