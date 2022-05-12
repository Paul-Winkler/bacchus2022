<script setup lang="ts">
import ApiError from '~/assets/code/helper/ApiError';
import User, { createUser, createUserWithName } from '~~/assets/code/interfaces/User';

definePageMeta({
  layout: "welcome",
});

const idCookie = useCookie("id");
const managerCookie = useCookie("manager");
const user = useState<User>('user', () => createUser());

const error = ref("");
const success = ref(false);

const validateName = (name: string) => name.split(" ").length === 2 && name.split(' ')[1].length > 2;

async function handleForm(event: SubmitEvent) {
  const setError = (err) => {
    error.value = err;
    console.warn('Failed to submit form due to error: ', err);
  };

  const name = (event.target as any).elements.name.value as string;

  if (validateName(name)) error.value = "";
  else return setError("Bitte fülle die Felder korrekt aus.");

  user.value = createUserWithName(name.split(' ')[1], name.split(' ')[0]);

  try {
    const res = await fetch(`/api/user/add?surname=${user.value.surname}&name=${user.value.name}`, { method: "POST" });

    if (res.status === 200) {
      success.value = true;

      idCookie.value = user.value.id;
      managerCookie.value = "false";

      setTimeout(() => useRouter().push("/overview"), 2000);
    } else {
      const err = await res.json() as ApiError;
      console.error("Failed to create user", err);

      return setError("Erstellen des Nutzers ist fehlgeschlagen:\n" + err.reason);
    }
  } catch (err) {
    console.error("Failed to create user", err);
    return setError("Ein interner Fehler ist aufgetreten:\n" + err);
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>Bacchus 2022 - Als Teilnehmer anmelden</Title>
    </Head>

    <h2>Als Teilnehmer anmelden</h2>
  
    <section>
      <p>Um sich als Teilnehmer für das heutige Event zu registrieren, füllen Sie bitte das folgende Formular aus.</p>
      <p>Ihr Pseudonym wird am Ende des Events auf der Bestenliste erscheinen.</p>
    </section>

    <h3>Formular</h3>

    <div id="responses">
      <BasicError v-if="error">{{ error }}</BasicError>
      <BasicSuccess v-if="success">Nutzer erfolgreich erstellt</BasicSuccess>
    </div>

    <form @submit.prevent="handleForm">
      <InputText title="Ihr Name" placeholder="Max Mustermann" entry-name="name" :validate="validateName" />
      <button type="submit">Daten abschicken</button>
    </form>

    <BasicInfoBox>
      <template #title>Datenschutz</template>
      Alle Daten, die Sie in diesem Webportal angeben, werden ausschließlich für die Bereitstellung des Portals und für den heutigen Abend verwendet. 
      Anschlißend werden sie wieder gelöscht.
    </BasicInfoBox>
  </div>
</template>
