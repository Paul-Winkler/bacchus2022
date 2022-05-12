<script>
export default {
  props: {
    title: String,
    placeholder: String,
    entryName: String,
  },
  data() {
    return {
      val: "",
    }
  }
}
</script>

<template>
  <label :for="entryName">{{ title }}:</label>
  <input :id="entryName" type="password" :placeholder="placeholder" :name="entryName" required v-model="val">
</template>

<style scoped>
label {
  display: block;
  margin: 1rem 0 0.3rem 0;
}

input {
  display: inline-block;
  background: 0;
  border: 0;
  outline: none;
  width: 80%;
  max-width: 500px;
  font-size: 1rem;
  transition: 0.15s;
  transition: padding 0.3s 0.2s ease;
  border-bottom: var(--border-width) solid var(--border-std);
  border-radius: 0;
  color: var(--text-std);

  padding-bottom: 5px;
  margin-bottom: 1rem;
}
</style>
