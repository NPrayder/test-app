<template>
  <div class="v-application page-container d-sm-flex flex-sm-column">
    <div class="wrapper">
      <div class="app-title white-text text-sm-center text-md-left">
        <h1 class="title-text">Op LENTUS</h1>
        <h1 class="title-text yellow-text">SIM - SLO</h1>
      </div>
      <div class="divider"/>

    </div>
    <login-form class="login-form"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginForm from '@/components/login/LoginForm.vue';

@Component({
  components: {LoginForm}
})
export default class Login extends Vue {
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/settings/variables";
@import "../assets/styles/colors";

.page-container {
  background: url("../assets/images/bg-pattern.png") repeat;
  background-size: cover;
  min-height: 100vh;

  .wrapper {
    width: 100%;

    .app-title {
      margin: 80px 80px 60px;

      @media #{map-get($display-breakpoints, 'md-only')} {
        margin: 60px;
      }

      @media #{map-get($display-breakpoints, 'sm-only')} {
        margin: 48px 0 36px;
      }

      .title-text {
        font-family: 'Exo2', sans-serif;
        font-weight: 500;
        font-size: 45px;
        line-height: 1.25;
      }
    }

    .divider {
      width: 100%;
      opacity: 0.25;
      border-bottom: 5px solid $yellow;
    }
  }

  .login-form {
    position: absolute;
    right: 80px;
    top: 48px;

    @media #{map-get($display-breakpoints, 'sm-only')} {
      position: unset;
      margin: 24px auto;
    }

    @media #{map-get($display-breakpoints, 'xs-only')} {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    @media (max-height: 1024px) and (min-width: 800px) {
      top: 24px;
    }
  }
}
</style>
