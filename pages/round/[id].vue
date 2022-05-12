<script setup lang="ts">
import { Round } from '~~/assets/code/interfaces/Round';
import User, { Answer, createUser } from '~~/assets/code/interfaces/User';

definePageMeta({
  layout: "overview",
});

const user = useState<User>('user', () => createUser());
const tastingsID = parseInt(useRoute().params.id as string);

const timeSavedCookie = useCookie(`time-left-${tastingsID}`);
const secondsLeft = ref(600);
let interval: number;

if (timeSavedCookie.value) secondsLeft.value = parseInt(timeSavedCookie.value);

onMounted(() => {
  if (user.value.answers.length > tastingsID-1) {
    console.warn("Illegal access");
    useRouter().go(-1);
  }

  interval = setInterval(() => {
    --secondsLeft.value;
    timeSavedCookie.value = ""+secondsLeft.value;

    if (secondsLeft.value === 0) {
      user.value.answers.push(null);
      useRouter().push("/overview");
    }
  }, 1000) as unknown as number;
})

onUnmounted(() => {
  clearInterval(interval)
});

const { data } = await useAsyncData(`tasting-${tastingsID}`, () => $fetch(`/api/round?id=${tastingsID}`));
const tasting = JSON.parse(data.value as string) as Round;

const selectedWine = ref<null | Answer>(null);

async function submit() {
  user.value.answers.push(selectedWine.value)

  try {
    const res = await fetch(`/api/user/answer?id=${user.value.id}&answer=${selectedWine.value}&round=${tastingsID}`, { method: "POST" });
    if (res.status === 200) useRouter().push('/overview');
    else {
      const err = res.json();
      console.error(err);
    }
  } catch (err) {
    console.error("Internal error", err);
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>Bacchus 2022 - Runde {{tastingsID}}</Title>
    </Head>

    <h2>Weinverkostung Runde {{ tastingsID }}</h2>

    <section>
      <p>Bitte probiere nun die zwei Weine.</p>
      <p>Die Weinflaschen wurden jeweils mit einem gelben und einem blauen Punkt gekennzeichnet. Bitte wähle anschließend den Wein aus, der dir besser schmeckt.</p>
    </section>

    <section>
      <h3>Abstimmung</h3>
      <div class="wine first" :class="[selectedWine === 'blue' ? 'selected' : '']" @click="selectedWine = 'blue'">
        <WelcomeInfo>
          <template #icon>
            <img src="~/assets/images/wine-bottle-blue.png" alt="Wine Bottle Icon" class="icon">
          </template>
          <template #heading>Flasche mit blauem Punkt</template>

          Klicke hier, um diese Flasche auszuwählen
        </WelcomeInfo>
      </div>
      <div class="wine second" :class="[selectedWine === 'yellow' ? 'selected' : '']" @click="selectedWine = 'yellow'">
        <WelcomeInfo>
          <template #icon>
            <img src="~/assets/images/wine-bottle-yellow.png" alt="Wine Bottle Icon" class="icon">
          </template>
          <template #heading>Flasche mit gelbem Punkt</template>

          Klicke hier, um diese Flasche auszuwählen
        </WelcomeInfo>
      </div>
    </section>

    <button @click="submit" :disabled="selectedWine === null">Abstimmen</button>

    <BasicInfoBox>
      <template #title>Zeitlimit</template>
      Für diese Abgabe gibt es ein Zeitlimit. Du hast noch {{ Math.floor(secondsLeft / 60) }} Minuten und {{ secondsLeft % 60 }} Sekunden übrig.
    </BasicInfoBox>
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

.selected::before {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: 0;
  height: 0;
  background: transparent;
  border: calc(var(--border-width) + 1px) solid transparent;
  animation: animate .7s linear forwards;
}

@keyframes animate {
  0% {
    width: 0;
    height: 0;
    border-top-color: var(--success-color);
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
  }

  50% {
    width: 100%;
    height: 0;
    border-top-color: var(--success-color);
    border-right-color: var(--success-color);
    border-bottom-color: transparent;
    border-left-color: transparent;
  }

  100% {
    width: 100%;
    height: 100%;
    border-top-color: var(--success-color);
    border-right-color: var(--success-color);
    border-bottom-color: transparent;
    border-left-color: transparent;
  }
}

.selected::after {
  content: "";
  position: absolute;
  top: -2px;
  left: -2px;
  width: 0;
  height: 0;
  background: transparent;
  border: calc(var(--border-width) + 1px) solid transparent;
	animation: animates .7s linear forwards;
}

@keyframes animates {
	0% {
		width: 0;
		height: 0;
		border-top-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		border-left-color: var(--success-color);
	}

	50% {
		width: 0;
		height: 100%;
		border-top-color: transparent;
		border-right-color: transparent;
		border-bottom-color: var(--success-color);
		border-left-color: var(--success-color);
	}

	100% {
		width: 100%;
		height: 100%;
		border-top-color: transparent;
		border-right-color: transparent;
		border-bottom-color: var(--success-color);
		border-left-color: var(--success-color);
	}
}
</style>