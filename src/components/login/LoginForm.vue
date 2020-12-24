<template>
  <div class="form-container black-bg py-10 d-flex flex-column justify-space-around">
    <div class="form-title d-flex flex-column justify-center align-center">
      <h1 class="text-uppercase white-text">Welcome back</h1>
      <span class="subtitle text-uppercase white-text">Login into your <span
          class="yellow-text">admin portal</span></span>
    </div>

    <form @submit.prevent="handleSubmit"
          class="d-flex justify-center flex-column align-center py-6">
      <div class="inputs-container d-flex flex-column">
        <div class="input-wrapper">
          <label class="white-text font-weight-bold">Email address or username <span class="red--text">*</span></label>
          <v-text-field
              v-model.trim="username"
              outlined
              class="input mt-1"
              autocomplete="off"
              :error-messages="$v.username.$dirty && !$v.username.required ? 'This field is required' : null"
          />
        </div>

        <div class="input-wrapper">
          <label class="white-text font-weight-bold">Password <span class="red--text">*</span></label>
          <v-text-field
              v-model.trim="password"
              outlined
              class="input mt-1"
              autocomplete="off"
              :type="isShowPassword ? 'text' : 'password'"
              :append-icon="isShowPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
              :error-messages="$v.password.$dirty && !$v.password.required ? 'This field is required' : null"
              @click:append="isShowPassword = !isShowPassword"
          />
        </div>
      </div>
    </form>

    <div class="d-flex justify-center flex-column align-center">
      <v-btn
          class="login-btn"
          color="#f5f5f5"
          type="submit"
          depressed
          outlined
          :loading="isLoading"
          @click="handleSubmit"
      >
        Login
      </v-btn>

      <div class="bottom-line d-flex justify-space-between align-center">
        <v-checkbox
            v-model="isStaySignedIn"
            class="checkbox"
            label="Stay sign in"
        ></v-checkbox>

        <a class="yellow-text font-weight-bold">
          Forgot your password?
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Validate } from 'vuelidate-property-decorators';
import { required } from 'vuelidate/lib/validators';
import * as actionTypes from '@/store/actionTypes';

@Component
export default class LoginForm extends Vue {
  @Validate({required})
  username: string = '';
  @Validate({required})
  password: string = '';
  isStaySignedIn: boolean = false;
  isShowPassword: boolean = false;
  isLoading: boolean = false;

  async handleSubmit(): Promise<void> {
    this.$v.$touch();

    if (this.$v.$invalid) {
      return;
    }

    this.isLoading = true;

    await this.$store.dispatch(actionTypes.LOGIN, {
      username: this.username,
      password: this.password,
      isStaySignedIn: this.isStaySignedIn,
    });

    await this.$router.push('/');

    this.isLoading = false;
  }
}
</script>

<style scoped lang="scss">
@import "~vuetify/src/styles/settings/variables";
@import "../../assets/styles/colors";

.form-container {
  box-shadow: 24px 19px 86px rgba(0, 0, 0, 0.75);

  max-width: 610px;
  width: 100%;
  height: calc(100% - 100px);
  padding: 0 12px;

  @media (max-height: 1024px) and (min-width: 800px) {
    height: calc(100% - 48px);
  }

  @media #{map-get($display-breakpoints, 'xs-only')} {
    height: 100%;
  }

  @media (max-width: 1200px) {
    max-width: 480px;
  }

  .form-title {
    .subtitle {
      font-size: 16px;
    }
  }

  .inputs-container {
    max-width: 320px;
    width: 100%;

    .input-wrapper {
      width: 100%;

      &:first-child {
        margin-bottom: 30px;
      }

      .input {
        border-radius: 6px;
        width: 100%;


        &:not(.v-input--is-focused):not(.error--text) {
          ::v-deep {
            .v-input__slot {
              fieldset {
                border-color: $white;
              }
            }
          }
        }

        &.v-input--is-focused:not(.error--text) {
          ::v-deep {
            .v-input__slot {
              box-shadow: 0 0 10px $yellow;
            }
          }
        }

        ::v-deep {
          .v-input__slot {
            input {
              color: $white;
            }
          }
        }
      }
    }
  }

  .login-btn {
    width: 160px;
    border-radius: 0;
    margin-bottom: 12px;
  }

  .bottom-line {
    font-size: 16px;
    width: 100%;
    max-width: 320px;

    .checkbox {
      ::v-deep {
        .v-label {
          color: $white;
          font-weight: bold;
        }

        .mdi-checkbox-blank-outline {
          color: #fbfbfb;
        }
      }
    }
  }

  ::v-deep {
    .v-icon {
      color: $white !important;
    }
  }
}
</style>
