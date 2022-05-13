<template>
  <section class="register">
      <h2>Beim Event anmelden</h2>
      <div class="flex-container">
        <div class="flex-element">
          <h3>Dem WLAN-Netzwerk beitreten</h3>
          <p>Um dem WLAN-Netzwerk beizutreten, scannen Sie bitte diesen QR-Code mit der <b>Kamera App</b> auf Ihrem Smartphone</p>
          <img src="/wlan.png" alt="wlan-qr-code">
        </div>

        <div class="flex-element">
          <h3>Das Webportal aufrufen</h3>
          <p>Sobald Sie mit dem Wlan Netzwerk verbunden sind, können Sie das Webportal aufrufen, indem Sie den folgenden QR-Code einscannen</p>
          <img src="/site.png" alt="website-qr-code">
        </div>
      </div>
    </section>
</template>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
}

.flex-element {
  margin: 0 1rem;
}

img {
  height: 250px;
}
</style>