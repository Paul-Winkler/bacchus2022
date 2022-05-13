<script setup lang="ts">
import { Round } from '~~/assets/code/interfaces/Round';

definePageMeta({
  layout: "manage",
});

const { data } = await useAsyncData('tastings', () => $fetch('/api/round?id=0'))
const rounds = JSON.parse(data.value as string) as Round[];

const discounterCounts = [];
const premiumCounts = [];

for (let i = 0; i < rounds.length; ++i) {
  if (rounds[i].yellow.price > rounds[i].blue.price) {
    premiumCounts.push(rounds[i].yellow.choosenBy.length);
    discounterCounts.push(rounds[i].blue.choosenBy.length);
  } else {
    discounterCounts.push(rounds[i].yellow.choosenBy.length);
    premiumCounts.push(rounds[i].blue.choosenBy.length);
  }
}

const chartDatas = [];
for (let i = 0; i < discounterCounts.length; ++i) {
  chartDatas.push({
    labels: [ 'Discounterwein', 'Winzerwein'],
    datasets: [{ 
      label: 'Anzahl der Stimmen',
      data: [
        discounterCounts[i],
        premiumCounts[i]
      ],
      backgroundColor: [
        '#FF851B',
        '#2ECC40',
      ],
    }]
  })
}

const dicounterAll = discounterCounts.reduce((pv, cv) => pv + cv, 0);
const premiumAll = premiumCounts.reduce((pv, cv) => pv + cv, 0);

const chartData = {
  labels: [ 'Discounterwein', 'Winzerwein'],
  datasets: [{ 
    label: 'Anzahl der Stimmen',
    data: [
      dicounterAll,
      premiumAll
    ],
    backgroundColor: [
      '#FF851B',
      '#2ECC40',
    ],
  }]
}

const ready = ref(false);

onMounted(() => ready.value = true);
</script>

<template>
  <div class="center">
    <Head>
      <Title>Bacchus 2022 - Ergebnisse aller Runden</Title>
    </Head>

    <h2>Gesamtübersicht</h2>

    <div class="all-results" v-if="ready">
      <h3>Ergebnisse aller Runden zusammengefasst</h3>
      <div class="chart-container summary">
          <WineChart chart-id="all" :chart-data="chartData" />
        </div>
    </div>

    <ul class="flex-container" v-if="ready">
      <li v-for="(chartData, ind) in chartDatas" :key="ind">
        <h3>Ergebnis der {{ind+1}}. Runde</h3>
        <div class="chart-container">
          <WineChart :chart-id="ind" :chart-data="chartData" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.center {
  /* position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%); */
}

.all-results {
  margin: 2rem auto;
}

.summary {
  margin: 0 auto !important;
  width: 300px !important;
  height: 300px !important;
}

.flex-container {
  display: flex;
  width: 100vw;
  overflow: scroll;
  padding: 0;
  
  position: absolute;
  left: 0;
} 

.chart-container {
  margin: 2rem;
  width: 220px;
  height: 220px;
}

ul {
  list-style: none;
}

</style>