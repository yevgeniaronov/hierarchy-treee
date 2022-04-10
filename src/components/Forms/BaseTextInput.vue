<template>
  <div>
    <label :for="name">{{ $attrs.label }}:</label>
    <input @input="onInput" v-bind="{ ...$attrs, ...$props }" />
  </div>
</template>

<script>
export default {
  name: "BaseTextInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // methods
    const onInput = (e) => {
      emit("update:modelValue", e.target.value);
    };

    return {
      onInput,
    };
  },
};
</script>

<style></style>
