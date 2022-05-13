<script setup lang="ts">
import User, { createUser } from '~~/assets/code/interfaces/User';

// Get saved data
const idCookie = useCookie("id")
const managerCookie = useCookie("manager")
const user = useState<User>("user", () => createUser());

// Check for id cookie, if not, redirect to signup
if (managerCookie.value !== true) useRouter().push('/');
</script>

<template>
  <div id="layout">
    <header>
      <div id="a">
        <img id="logo" src="~/assets/images/logo.png" alt="A Logo containing a bottle of wine">
        <h1 class="curly-font">Bacchus 2022</h1>
      </div>

      <div id="b">
        <h1 class="curly-font">Event Übersicht</h1>
      </div>
    </header>

    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
#layout {
  --logo-diameter: 75px;
  
  margin: 0;
  text-align: center;
  overflow-x: hidden;
}

#a {
  display: flex;
  align-items: center;
  width: calc(var(--logo-diameter) + 14.5rem);
  margin: 0rem 0 0 2rem;
  position: absolute;
  top: 20px
}

#b {
  position: absolute;
  top: 19px;
  left: 50%;
  transform: translateX(-50%);
}

#logo {
  width: var(--logo-diameter);
  height: var(--logo-diameter);
}

h1 {
  margin-left: 1.3rem;
  font-size: 2.2rem;
}

main {
  margin: 8rem auto 2.5rem auto;
  max-width: var(--max-width);
}
</style>