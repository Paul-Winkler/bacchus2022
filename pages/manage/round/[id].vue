<script setup lang="ts">
definePageMeta({
  layout: "manage",
});

const roundID = parseInt(useRoute().params.id as string);

function route() {
  useRouter().push(`/manage/result/${roundID}`)
}
</script>

<template>
  <div class="center">
    <Head>
      <Title>Bacchus 2022 - Abstimmung Runde {{ roundID }}</Title>
    </Head>

    <h2>Abstimmung der Runde {{roundID}} läuft</h2>
    <div class="img-container">
      <img src="~/assets/images/wine-bottle.png" alt="A wine bottle">
    </div>
    <br>
    <button @click="route">Abstimmung beenden</button>
  </div>
</template>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.img-container {
  --img-width: 150px;

  width: var(--img-width);
  height: var(--img-width);
  display: inline-block;
  margin-bottom: 75px;

  position: relative;
  top: 25px;
  animation: pulse 2s ease infinite;
}

.img-container > img {
  width: var(--img-width);
  height: var(--img-width);
}

@keyframes pulse {
  0% { scale: 1; }
  50% { scale: 1.1; }
  100% { scale: 1; }
}
</style>