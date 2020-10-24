<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
          <v-spacer></v-spacer>
      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2">Answers Report</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <dashboard/>
    </v-main>
  </v-app>
</template>

<script>
import dashboard from './components/dashboard'

export default {
  name: 'App',

  components: {
    dashboard
  },

  data: () => ({
    //
  })
}
</script>
