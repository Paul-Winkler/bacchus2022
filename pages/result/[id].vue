<script setup lang="ts">
import { Round } from "~~/assets/code/interfaces/Round";
import User, { createUser } from "~~/assets/code/interfaces/User";

definePageMeta({
  layout: "overview",
});

const user = useState<User>('user', () => createUser());
const tastingsID = parseInt(useRoute().params.id as string);

onMounted(() => {
  if (user.value.answers.length <= tastingsID-1) {
    console.warn("Illegal access");
    useRouter().go(-1);
  }
})

const { data } = await useAsyncData(`tasting-${tastingsID}`, () => $fetch(`/api/round?id=${tastingsID}`));
const tasting = JSON.parse(data.value as string) as Round;
</script>

<template>
  <div>
    <Head>
      <Title>Bacchus 2022 - Ergebnisse der Runde {{tastingsID}}</Title>
    </Head>

    <h2>Ergebnis der Runde {{ tastingsID }}</h2>

    <section>
      <p>Hier findest du Informationen über die probierten Weine. Der Wein, den du als besser empfunden hast, ist grün markiert.</p>
    </section>

    <section>
      <h3>Deine Antwort</h3>
      <div class="wine first" :class="{'selected': user.answers[tastingsID-1] === 'blue' }">
        <WelcomeInfo>
          <template #icon>
            <img src="~/assets/images/wine-bottle-blue.png" alt="Wine Bottle Icon" class="icon">
          </template>
          <template #heading>Flasche mit blauem Punkt</template>

          <p class="data"><b>Name:</b> {{ tasting.blue.name }}</p>
          <p class="data"><b>Herkunft:</b> {{ tasting.blue.origin }}</p>
          <p class="data"><b>Preis:</b> {{ tasting.blue.price }}</p>
          <p class="data" v-if="tasting.blue.link"><b>Weitere Infos:</b> <a :href="tasting.blue.link" target="_blank">Shop aufrufen</a></p>
        </WelcomeInfo>
      </div>
      <div class="wine second" :class="{'selected': user.answers[tastingsID-1] === 'yellow' }">
        <WelcomeInfo>
          <template #icon>
            <img src="~/assets/images/wine-bottle-yellow.png" alt="Wine Bottle Icon" class="icon">
          </template>
          <template #heading>Flasche mit gelbem Punkt</template>

          <p class="data"><b>Name:</b> {{ tasting.yellow.name }}</p>
          <p class="data"><b>Herkunft:</b> {{ tasting.yellow.origin }}</p>
          <p class="data"><b>Preis:</b> {{ tasting.yellow.price }}</p>
          <p class="data" v-if="tasting.yellow.link"><b>Weitere Infos:</b> <a :href="tasting.yellow.link" target="_blank">Shop aufrufen</a></p>
        </WelcomeInfo>
      </div>
    </section>

    <section>
      <p>Mehr Informationen findest du in Kürze auf unserer Präsentation.</p>
    </section>
  </div>
</template>

<style>
.icon {
  width: 75px;
  height: 75px;
}

.wine {
  cursor: pointer;
  position: relative;
}

.data {
  margin: 0.4rem 0;
}

.selected-correct {
  border: calc(var(--border-width) + 1px) solid var(--success-color);
}

.selected-wrong {
  border: calc(var(--border-width) + 1px) solid var(--error-color);
}
</style>