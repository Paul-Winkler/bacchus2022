<script setup lang="ts">
import User from "~~/assets/code/interfaces/User";

defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="round" >
    <h4 class="inline">{{ user.name }} {{ user.surname }} ist registriert</h4>
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