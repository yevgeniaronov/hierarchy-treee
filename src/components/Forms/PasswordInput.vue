<template>
  <base-text-input v-bind="{ ...$attrs }" :display-value="maskedPassword">
  </base-text-input>
</template>

<script>
import BaseTextInput from "@/components/Forms/BaseTextInput.vue";
import { computed } from "vue";
export default {
  components: {
    BaseTextInput,
  },
  setup() {
    // computed

    const maskedPassword = computed(() => {
      return "*";
    });

    return {
      maskedPassword,
    };
  },
};
</script>

<style></style>
