<script>
export default {
  props: {
    tastings: Array,
    answered: Number,
    answers: Array
  },
  computed: {
    avaible() {
      if (!this.tastings) return []
      else return this.tastings.filter(el => el.round <= this.$props.answered);
    }
  }
}
</script>

<template>
  <section class="answers">
    <h3>Deine bisherigen Antworten</h3>

    <div id="answers-container">
      <template v-if="answered > 0">
        <OverviewAnswer 
          v-for="(answer, ind) in avaible" :key="ind" :ind="ind+1"
          :choosen="answers[ind]"
        />
      </template>
      <p v-else>Du hast noch keine Runde abgeschlossen</p>
    </div>
  </section>
</template>