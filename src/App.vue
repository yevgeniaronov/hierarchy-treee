<template>
  <!-- this entire layout should be handled by specific layout that can be changed on the fly, and not handled by App.vue-->
  <nav class="app__nav">
    <div v-if="isAuth">
      {{ fullName }}
      (<a href="" @click="logout">logout</a>)
    </div>
  </nav>
  <div class="app__title">{{ $route.meta?.title }}</div>
  <router-view />
</template>
<script>
import { computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { LOGOUT } from "@/store/modules/auth/consts";
import { GET_USER_PROFILE } from "@/store/modules/user/consts";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const logout = () => {
      store.dispatch(LOGOUT);
      router.push({ name: "login" });
    };

    const userId = computed(() => store.state.user.id);
    const isAuth = computed(() => store.getters.getIsAuth);
    const fullName = computed(() => store.getters.getFullName);

    onBeforeMount(() => {
      if (userId.value) {
        store.dispatch(GET_USER_PROFILE, { userId: userId.value });
      }
    });

    return {
      fullName,
      isAuth,
      logout,
    };
  },
};
</script>

<style lang="scss">
html,
body,
.app {
  height: 100%;
}

.app {
  display: flex;
  flex-flow: column;
  font-family: "Roboto";
  &__title {
    font-size: 32px;
  }

  &__nav {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
