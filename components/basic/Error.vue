<template>
  <section class="error-box">
    <p><slot /></p>
  </section>
</template>

<style scoped>
.error-box {
  width: inherit;
  height: auto;
  border: var(--border-width) solid var(--error-color);
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: justify;
  color: var(--error-color);

  animation: fadeIn 0.3s;
}

.error-box > p {
    margin: 0;
}
</style>