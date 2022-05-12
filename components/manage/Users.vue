<script>
export default {
  props: {
    users: Array
  }
}
</script>

<template>
  <section class="answers">
    <h3>Die angemeldeten Nutzer:</h3>

    <div id="answers-container">
      <template v-if="users.length > 0">
        <ManageUser v-for="(user, ind) in users" :key="ind" :user="user" />
      </template>
      <p v-else>Es sind noch keine Nutzer angemeldet</p>
    </div>
  </section>
</template>