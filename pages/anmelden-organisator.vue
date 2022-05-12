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
    console.error('Faile to submit form due to error: ', err);
  };

  const data = (event.target as any).elements;
  const name = data.name.value as string;
  const passwd = data.passwd.value as string;

  if (validateName(name) && passwd.length > 4) error.value = "";
  else return setError("Bitte fülle die Felder korrekt aus.");

  user.value = createUserWithName(name.split(' ')[1], name.split(' ')[0]);

  try {
    const res = await fetch(`/api/auth?p=${passwd}`, { method: "POST" });

    if (res.status === 200) {
      success.value = true;

      idCookie.value = user.value.id;
      managerCookie.value = "true";

      setTimeout(() => useRouter().push('/manage'), 2000);
    } else {
      const err = await res.json() as ApiError;
      console.error("Failed to sign in: ", err);
      return setError("Einloggen fehlgeschlagen:\n" + err.reason)
    }
  } catch (err) {
    console.error("Failed to sign in", err);
    return setError("Ein interner Fehler ist aufgetreten:\n" + err)
  }
}
</script>

<template>
  <div>
    <Head>
      <Title>Bacchus 2022 - Als Organisator anmelden</Title>
    </Head>

    <h2>Als Organisator anmelden</h2>

    <section>
      <p>Um sich als Organisator für das heutige Event anzumelden, füllen Sie bitte das folgende Formular aus.</p>
    </section>

    <h3>Formular</h3>

    <div id="responses">
      <BasicError v-if="error">{{ error }}</BasicError>
      <BasicSuccess v-if="success">Erfolgreich angemeldet</BasicSuccess>
    </div>

    <form @submit.prevent="handleForm">
      <InputText title="Ihr Name" placeholder="Max Mustermann" entry-name="name" :validate="validateName" />
      <InputPassword title="Passwort" placeholder="********" entry-name="passwd" />

      <button type="submit">Daten abschicken</button>
    </form>

    <BasicInfoBox>
      <template #title>Berechtigungen</template>
      Bitte füllen Sie das Formular nur aus, wenn Sie Organisator des heutigen Abends sind. <br>
      Die benötigten Zugangsdaten erhalten Sie von Paul Winkler.
    </BasicInfoBox>
  </div>
</template>
