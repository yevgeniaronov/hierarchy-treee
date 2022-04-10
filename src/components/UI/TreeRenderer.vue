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
      <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
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
