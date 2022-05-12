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

discounterCounts.unshift(discounterCounts.reduce((pv, cv) => pv + cv, 0));
premiumCounts.unshift(premiumCounts.reduce((pv, cv) => pv + cv, 0));

const chartDatas = [];
for (let i = 0; i < discounterCounts.length; ++i) {
  chartDatas.push({
    labels: [ 'Discounterwein', 'Premiumwein'],
    datasets: [ 
    { 
      label: 'Anzahl der Stimmen',
      data: [
        discounterCounts[i],
        premiumCounts[i]
      ],
      backgroundColor: [
        '#F5B332',
        '#5CB3A6',
      ],
    } 
    ]
  })
}
</script>

<template>
  <div class="center">
    <Head>
      <Title>Bacchus 2022 - Ergebnisse aller Runden</Title>
    </Head>

    <h2>Gesamtübersicht</h2>

    <ul class="flex-container">
      <li v-for="(chartData, ind) in chartDatas" :key="ind">
        <h3>{{ ind == 0 ? "Gesamtwertung" : `Ergebnis der ${ind}. Runde` }}</h3>
        <div class="chart-container">
          <ChartsWineSelected :chart-id="ind" :chart-data="chartData" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.center {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.flex-container {
  display: flex;
  width: 100vw;
  overflow: scroll;
} 

.chart-container {
  margin: 2rem;
  width: 300px;
  height: 300px;
}

ul {
  list-style: none;
}

li:first-of-type {
  margin-left: 2.5rem;
}

li:last-of-type {
  margin-right: 2.5rem;
}
</style>