<template>
  <div class="login-view">
    <login-form
      class="login-view__form"
      @form-submitted="onFormSubmit"
    ></login-form>
  </div>
</template>
<script>
import LoginForm from "./components/LoginForm.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LOGIN } from "@/store/modules/auth/consts";
export default {
  components: {
    LoginForm,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const onFormSubmit = async (payload) => {
      try {
        await store.dispatch(LOGIN, payload);
        router.push({ name: "hierarchy-tree" });
      } catch (error) {
        console.error(error);
      }
    };

    return {
      onFormSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-view {
  display: flex;
  justify-content: center;
  flex: 1;
  align-self: center;
  flex-flow: column;
  &__form {
    display: flex;
    flex-flow: column;
  }
}
</style>
