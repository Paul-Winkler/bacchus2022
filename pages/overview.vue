<script setup lang="ts">
import { Round } from '~~/assets/code/interfaces/Round';
import User, { createUser } from '~~/assets/code/interfaces/User';

definePageMeta({
  layout: "overview",
});

const user = useState<User>('user', () => createUser());

const { data } = await useAsyncData('tastings', () => $fetch('/api/round?id=0'))
const tastings = JSON.parse(data.value as string) as Round[];

onMounted(() => user.value.name = user.value.name);
</script>

<template>
  <div>
    <Head>
      <Title>Bacchus 2022 - Übersicht</Title>
    </Head>

    <h2>Übersicht des Abends</h2>

    <OverviewAnswers :tastings="tastings" :answered="user.answers.length" :answers="user.answers" />
    <OverviewRounds :tastings="tastings" :answered="user.answers.length" />
  </div>
</template>