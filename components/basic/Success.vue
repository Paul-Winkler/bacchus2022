<template>
  <section class="success-box">
    <p><slot /></p>
  </section>
</template>

<style scoped>
.success-box {
  width: inherit;
  height: auto;
  border: var(--border-width) solid var(--success-color);
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: justify;
  color: var(--success-color);

  animation: fadeIn 0.3s;
}

.success-box > p {
    margin: 0;
}
</style>