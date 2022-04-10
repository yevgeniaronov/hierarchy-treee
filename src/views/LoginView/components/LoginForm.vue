<template>
  <!-- in real world app, there should be a schema based base-form component to handle field rendering, validation and output -->
  <form class="login-form" @submit.prevent="onFormSubmit">
    <base-text-input
      class="login-form__field"
      v-bind="{ ...loginForm.email, modelValue }"
      v-model="loginForm.email.modelValue"
    ></base-text-input>
    <password-input
      class="login-form__field"
      v-bind="{ ...loginForm.password, modelValue }"
      v-model="loginForm.password.modelValue"
    ></password-input>
    <base-button class="login-form__button"> Login </base-button>
  </form>
</template>

<script>
import BaseTextInput from "@components/Forms/BaseTextInput.vue";
import PasswordInput from "@components/Forms/PasswordInput.vue";
import BaseButton from "@components/UI/BaseButton.vue";
import { ref, reactive } from "vue";
export default {
  components: {
    BaseButton,
    BaseTextInput,
    PasswordInput,
  },
  setup(props, { emit }) {
    // state
    const loginForm = reactive({
      email: {
        label: "email address",
        modelValue: ref(""),
        validation: "",
        type: "email",
      },
      password: {
        label: "password",
        modelValue: ref(""),
        validation: "",
        type: "password",
      },
    });

    // methods
    const onFormSubmit = () => {
      emit("form-submitted", {
        email: loginForm.email.modelValue,
        password: loginForm.password.modelValue,
      });
    };

    return {
      onFormSubmit,
      loginForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  border: 1px solid blueviolet; // this should be part of theme file, using css properties
  padding: 2rem;
  &__field {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-block-end: 1rem;
  }
  &__button {
    background-color: blueviolet;
    border: 1px solid black;
    font-size: 18px;
    border-radius: 0.3rem;
    align-self: flex-end;
    padding-inline: 2rem;
  }
}
</style>
