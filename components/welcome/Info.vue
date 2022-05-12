<template>
  <section class="info-column">
    <div class="info-icon"><slot name="icon"></slot></div>
    
    <div class="info-details">
      <h3><slot name="heading"></slot></h3>

      <p><slot></slot></p>
    </div>
  </section>
</template>

<style scoped lang="css">
.info-column {
  margin: 1rem 0;
  display: flex;
  align-items: center;
}

.info-icon {
  margin-right: 1.5rem;
}

.info-details {
  text-align: left;
}
</style>