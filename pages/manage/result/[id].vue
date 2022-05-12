<script setup lang="ts">
import { Round, Wine } from '~~/assets/code/interfaces/Round';

definePageMeta({
  layout: "manage",
});

const contentID = ref(0);
const roundID = parseInt(useRoute().params.id as string);

const { data } = await useAsyncData('tastings', () => $fetch('/api/round?id='+roundID))
const round = JSON.parse(data.value as string) as Round;

const roundCookie = useCookie("round");

const chartData = ref({
  labels: [ 'Wein mit gelbem Punkt', 'Wein mit blauem Punkt'],
  datasets: [ 
  { 
    label: 'Anzahl der Stimmen',
    data: [
      round.yellow.choosenBy.length,
      round.blue.choosenBy.length
    ],
    backgroundColor: [
      '#E1CC0F',
      '#0790F1',
    ],
  } 
  ]
})

let yellowIsPremium: boolean | undefined;
let premiumWine: Wine | undefined;
let discounterWine: Wine | undefined;

function revealWines() {
  if (contentID.value == 0) {
    yellowIsPremium = round.yellow.price > round.blue.price;

    if (yellowIsPremium) {
      chartData.value.labels = ["Premiumwein", "Discounterwein"];
      premiumWine = round.yellow;
      discounterWine = round.blue
    } else {
      chartData.value.labels = ["Discounterwein", "Premiumwein"];
      premiumWine = round.blue;
      discounterWine = round.yellow
    }
  } else if (contentID.value == 5) {
    roundCookie.value = ""+(parseInt(roundCookie.value)+1);

    useRouter().push("/manage");
  }

  ++contentID.value;
}
</script>

<template>
  <div class="center">
    <Head>
      <Title>Bacchus 2022 - Ergebnis der Runde {{ roundID }}</Title>
    </Head>

    <h2>Ergebnisse der {{roundID}}. Runde</h2>

    <div class="flex-container">
      <div class="color-container">
        <h3>Verteilung der Stimmen</h3>
        <div class="chart-container">
          <ChartsWineSelected chart-id="colors" :chart-data="chartData" />
        </div>
      </div>

      <div class="wine-one" v-if="contentID >= 1">
        <div class="title">
          <img src="~/assets/images/wine-bottle-yellow.png" alt="Wine Bottle Icon" class="icon">
          <h3>{{ yellowIsPremium ?  "Premiumwein" : "Discounterwein" }}</h3>
          <img :src="`/img/round-${roundID}/yellow.png`" alt="Wine Bottle Icon" height="100">
        </div>

        <div class="info" v-if="contentID >= 2">
          <p class="bold">Rebsorte:</p>
          <p class="data">{{ round.yellow.grape }}</p>
        </div>

        <div class="info" v-if="contentID >= 3">
          <p class="bold">Anbaugebiet:</p>
          <p class="data">{{ round.yellow.region }}</p>
        </div>

        <div class="info" v-if="contentID >= 4">
          <p class="bold">Jahrgang:</p>
          <p class="data">{{ round.yellow.year }}</p>
        </div>

        <div class="info" v-if="contentID >= 5">
          <p class="bold">Name:</p>
          <p class="data">{{ round.yellow.name }}</p>
        </div>
      </div>

      <div class="wine-two"  v-if="contentID >= 1">
        <div class="title">
          <img src="~/assets/images/wine-bottle-blue.png" alt="Wine Bottle Icon" class="icon">
          <h3>{{ !yellowIsPremium ?  "Premiumwein" : "Discounterwein" }}</h3>
          <img :src="`/img/round-${roundID}/blue.png`" alt="Wine Bottle Icon" height="100">
        </div>

        <div class="info" v-if="contentID >= 2">
          <p class="bold">Rebsorte:</p>
          <p class="data">{{ round.blue.grape }}</p>
        </div>

        <div class="info" v-if="contentID >= 3">
          <p class="bold">Anbaugebiet:</p>
          <p class="data">{{ round.blue.region }}</p>
        </div>

        <div class="info" v-if="contentID >= 4">
          <p class="bold">Jahrgang:</p>
          <p class="data">{{ round.blue.year }}</p>
        </div>

        <div class="info" v-if="contentID >= 5">
          <p class="bold">Name:</p>
          <p class="data">{{ round.blue.name }}</p>
        </div>
      </div>
    </div>

    <button @click="revealWines">{{ contentID == 0 ? "Weine bekanntgeben" : contentID > 0 && contentID < 5 ? "Nächste Eigenschaft anzeigen" : "Runde abschließen" }} </button>
  </div>
</template>

<style scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  transition: 500ms;
}

.chart-container {
  margin: 2rem;
  width: 300px;
  height: 300px;
}

.flex-container {
  width: 80vw;
  display: flex;
  justify-content: space-around;
  animation: fadeIn 0.5s ease;
}

.icon {
  width: 75px;
  height: 75px;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
}

.title > h3 {
  margin-right: 2rem;
}

.info {
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 280px;
  animation: fadeIn 0.5s ease;
}

.bold {
  font-weight: bold;
  animation: fadeIn 0.5s ease;
}

.data {
  max-width: 200px;
  text-align: right;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>