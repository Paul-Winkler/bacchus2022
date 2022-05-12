<script>
export default {
  props: {
    tastings: Array,
    answered: Number,
  },
  computed: {
    avaible() {
      if (!this.tastings) return [];
      else return this.tastings.filter(el => el.round > this.$props.answered);
    }
  }
}
</script>

<template>
  <div id="rounds">
    <h3>Nächste Runden</h3>

    <div id="rounds-container">
      <template v-if="avaible.length > 0">
        <OverviewRound v-for="(round, ind) in avaible" :key="ind" :ind="round.round" />
      </template>
      <p v-else>Du hast bereits alle Runden abgeschlossen</p>
    </div>
  </div>
</template>

