<template>
  <li v-if="data">
    <slot :data="data"></slot>
  </li>
  <ul>
    <tree-renderer
      v-for="node in nodes"
      :key="node.id"
      :nodes="node.children"
      :data="node"
    >
      <template v-for="(_, slot) in $slots" #[slot]="{ data }">
        <slot :name="slot" :data="data" />
      </template>
    </tree-renderer>
  </ul>
</template>

<script>
export default {
  name: "TreeRenderer",
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
    },
  },
};
</script>
<style lang="scss" scoped>
li {
  list-style: none;
}
</style>
