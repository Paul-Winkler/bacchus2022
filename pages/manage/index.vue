<script setup lang="ts">
import { createUserWithID } from '~~/assets/code/interfaces/User';

definePageMeta({
  layout: "manage",
});

const { data, refresh, error } = await useAsyncData('user', () => $fetch('/api/user?id=Stefan-Raab'));
let parsedUserIdArray = JSON.parse(data.value as string) as string[];
let users = parsedUserIdArray.map(el => createUserWithID(el));

const roundCookie = useCookie("round");
if (!roundCookie.value) roundCookie.value = "1";

setInterval(() => {
  refresh();
  parsedUserIdArray = JSON.parse(data.value as string) as string[];
  users = parsedUserIdArray.map(el => createUserWithID(el))
}, 5000);

function forward() {
  useRouter().push('/manage/round/'+roundCookie.value);
}

function overview() {
  useRouter().push('/manage/results-all');
}
</script>

<template>
  <div>
    <Head>
      <Title>Bacchus 2022 - Manageransicht</Title>
    </Head>

    <ManageUsers :users="users" />

    <section v-if="parseInt(roundCookie) < 6">
      <h3>Nächste Runde</h3>
      <p>Die nächste Runde ist die {{ roundCookie }}. Runde</p>

      <button @click="forward">
        Runde {{ roundCookie }} starten
      </button>
    </section>

    <section v-else>
      <h3>Gesamtübersicht</h3>
      <p>Alle Runden wurden abgeschlossen. Du kannst nun die Gesamtwertung anzeigen</p>
      
      <button @click="overview">
        Gesamtübersicht anzeigen
      </button>
    </section>
  </div>
</template>