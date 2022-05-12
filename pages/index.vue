<script setup lang="ts">
definePageMeta({
  layout: "welcome",
});
</script>

<template>
  <article>
    <Head>
      <Title>Bacchus 2022 - Willkommen</Title>
    </Head>

    <h2>So funktioniert das Webportal:</h2>

    <WelcomeInfo>
      <template #icon>
        <img src="~/assets/images/list.png" alt="List Icon" class="icon">
      </template>
      <template #heading>Anmelden</template>

      Zu Beginn melden sich alle Teilnehmer mit ihren Daten an. Dafür werden Ihr Name und ein Pseudonym benötigt.
    </WelcomeInfo>

    <WelcomeInfo>
      <template #icon>
        <img src="~/assets/images/wine-bottle.png" alt="Bottle Icon" class="icon">
      </template>
      <template #heading>Weine verkosten</template>

      Anschließend werden in mehreren Runden je zwei Weine verkostet. Versucher Sie herauszufinden, welcher Wein der Teurere ist.
    </WelcomeInfo>

    <WelcomeInfo>
      <template #icon>
        <img src="~/assets/images/raise-hand.png" alt="Hand Icon" class="icon">
      </template>
      <template #heading>Abstimmen</template>
      
      Nach der Verkostung wird abgestimmt. Für das richtige Zuordnen eines Weines erhält man Punkte.
    </WelcomeInfo>

    <WelcomeInfo>
      <template #icon>
        <img src="~/assets/images/trophy.png" alt="Trophy Icon" class="icon">
      </template>
      <template #heading>Auswertung</template>
      
      Sobald über alle Weine abgestimmt wurde, wird eine Bestenliste erstellt.
    </WelcomeInfo>

    <section id="continue">
      <NuxtLink to="/anmelden">Alles klar, weiter!</NuxtLink>
    </section>
  </article>
</template>

<style scoped>
h2 {
  font-size: 1.4rem;
  margin-bottom: 0;
}

.icon {
  width: 75px;
  height: 75px;
}
</style>