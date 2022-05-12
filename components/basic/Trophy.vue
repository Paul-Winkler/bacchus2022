<script setup lang="ts">
defineProps<{ rank: string }>();
</script>

<template>
    <div id="trophy">
        <img src="~/assets/images/rank-trophy.png" alt="A trophy icon">
        <span id="trophy-text"><b>{{ rank }}</b></span>
    </div>
</template>

<style scoped>
#trophy {
    --trophy-length: 75px;

    position: relative;
    width: var(--trophy-length);
    height: var(--trophy-length);
}

#trophy > img {
    position: absolute;
    left: 0;
    top: 0;

    width: var(--trophy-length);
    height: var(--trophy-length);
}

#trophy-text {
    position: relative;
    left: 0%;
    top: calc(var(--trophy-length) / 20 * 3);

    font-weight: bold;
    color: rgb(112, 89, 3);
    font-size: 1.2rem;
}

@media (max-width: 700px) {
  #trophy-text {
    top: calc(var(--trophy-length) / 20 * 2);
  }
}
</style>