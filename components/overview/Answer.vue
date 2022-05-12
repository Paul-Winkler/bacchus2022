<script setup lang="ts">
defineProps<{
  ind: number;
  choosen: string;
}>();
</script>

<template>
  <div class="round" >
    <h4 class="inline">{{ ind }}. Runde</h4>
    <p v-if="choosen === 'yellow'" class="inline">Gelben Wein ausgewählt</p>
    <p v-else class="inline">Blauen Wein ausgewählt</p>
    <NuxtLink :to="`/result/${ind}`">Mehr Infos</NuxtLink>
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