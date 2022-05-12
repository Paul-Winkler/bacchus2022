<script setup lang="ts">
const id = useCookie('id')
const manager = useCookie('manager')

if (id) {
  if (manager.value == true) useRouter().push("/manage");
  else if (id.value) useRouter().push("/overview");
}
</script>

<template>
  <div id="layout">
    <div class="flex-container">
      <header>
        <img id="logo" src="~/assets/images/logo.png" alt="A Logo containing a bottle of wine">
        <h1 class="curly-font">Bacchus 2022</h1>
      </header>

      <section id="introduction">
        <p>Herzlich Willkommen bei unsrem diesjährigen Bacchus Event.</p>
        <p>Um das Webportal verwenden zu können melden Sie sich bitte über eine der folgenden Optionen an:</p>
      </section>

      <nav>
        <NuxtLink to="/anmelden">Als Teilnehmer anmelden</NuxtLink>  
        <NuxtLink to="/anmelden-organisator">Als Organisator anmelden</NuxtLink>
      </nav>
    </div>

    <main class="flex-container">
      <slot />
    </main>
  </div>
</template>

<style scoped>
#layout {
  --logo-diameter: 75px;
  
  margin: 0;
  text-align: center;
}

@media (max-width: 700px) {
  #layout {
    --logo-diameter: 50px;
    margin: 1rem;
  }
}

@media (min-width: 700px) {
  #layout {
    display: flex;
    justify-content: space-around;

    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  .flex-container {
    margin: auto 1rem;
    padding: 2rem ;
    max-width: 40vw;
    max-height: 100vh;
    overflow: auto;
  }
}

header {
  display: flex;
  align-items: center;
  width: calc(var(--logo-diameter) + 14.5rem);
  margin: 0 auto;
}

#logo {
  width: var(--logo-diameter);
  height: var(--logo-diameter);
}

header > h1 {
  margin-left: 1.3rem;
  font-size: 2.2rem;
}

a {
  background-color: transparent;
  text-decoration: none;
  font-style: italic;

  color: var(--link-std);
}

nav > a {
  padding: 0.2rem 1rem;
  margin: 0;
}

nav > a:first-of-type {
  border-right: 1px solid var(--border-std);
}

.router-link-active {
  color: var(--text-std);
  cursor: default;
}

@media (max-width: 700px) {
  nav > a {
    padding: 0.3rem 0;
  }

  nav > a:first-of-type {
    border-right: 0;
    border-bottom: 1px solid var(--border-std);
    width: initial;
  }

  nav > a:last-of-type {
    display: block;
    padding-top: 0.8rem;
  }
}

main {
  margin: 2.5rem auto;
  max-width: var(--max-width);
}
</style>