<template>
  <div class="hierarchy-treeview-item">
    <div class="hierarchy-treeview-item__type">{{ isManager ? "+" : "-" }}</div>
    <div>{{ fullName }}</div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: {
    data: {
      type: Object,
      required: false,
    },
  },
  setup(props) {
    console.log(props);
    // computed
    const isManager = computed(() => {
      return !!props.data?.children?.length || !props.data?.managerId;
    });

    const fullName = computed(
      () => `${props.data?.firstName} ${props.data?.lastName}`
    );

    return { isManager, fullName };
  },
};
</script>

<style lang="scss" scoped>
.hierarchy-treeview-item {
  display: flex;

  &__type {
    margin-inline-end: 1rem;
  }
}
</style>
