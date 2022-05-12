<script setup lang="ts">
import User, { createUser, parseUser, userIsInitialized } from '~~/assets/code/interfaces/User';

// Get saved data
const idCookie = useCookie("id")
const managerCookie = useCookie("manager")
const user = useState<User>("user", () => createUser());

// Check for id cookie, if not, redirect to signup
if (!idCookie.value) useRouter().push('/');

// Fetching userdata
const { data, refresh, error } = await useAsyncData('user', () => $fetch('/api/user?id='+idCookie.value));

// // Delete on client side if invalid
onMounted(() => {
  if (error.value) {
    idCookie.value = "";
    managerCookie.value = "";

    user.value = createUser();

    useRouter().push('/');
  }
});

// // Sending user data to vue storage
function updateUserData() {
  try {
    if (!error.value) user.value = parseUser(data.value as string);
    else console.warn('Failed to fetch initial user data', error.value);
  } catch (err) {
    console.log(err)
  }
}
updateUserData();
</script>

<template>
  <div id="layout">
    <header>
      <img id="logo" src="~/assets/images/logo.png" alt="A Logo containing a bottle of wine">
      <h1 class="curly-font">Bacchus 2022</h1>
    </header>

    <section id="introduction">
      <p v-if="userIsInitialized(user)">Hallo {{ user.name }}. Willkommen bei unserem Event.</p>
      <p>Hier in deiner Übersicht findest du alles wichtige zum heutigen Abend:</p>
    </section>

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

a {
  background-color: transparent;
  text-decoration: none;
  font-style: italic;

  color: var(--link-std);
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

main {
  margin: 2.5rem auto;
  max-width: var(--max-width);
}
</style>