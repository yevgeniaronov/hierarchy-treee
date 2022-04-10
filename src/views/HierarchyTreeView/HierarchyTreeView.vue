<template>
  <div class="hierarchy-tree">
    <tree-renderer :nodes="users" #default="{ data }">
      <hierarchy-tree-view-item :data="data"> </hierarchy-tree-view-item>
    </tree-renderer>
  </div>
</template>

<script>
import api from "@/api";
import { arrayToTree } from "performant-array-to-tree";
import { ref, onMounted } from "vue";
import TreeRenderer from "@components/UI/TreeRenderer.vue";
import HierarchyTreeViewItem from "./components/HierarchyTreeViewItem.vue";
export default {
  name: "HierarchyTreeView",
  components: {
    TreeRenderer,
    HierarchyTreeViewItem,
  },
  setup() {
    // state
    const users = ref([]);

    // methods
    const createUsersTree = (data) => {
      return arrayToTree(data, {
        dataField: null,
        parentId: "managerId",
      });
    };
    const getUsers = async () => {
      const { data } = await api.get("users.json");
      users.value = createUsersTree(data);
      console.log(users.value);
    };

    onMounted(() => {
      getUsers();
    });

    return { users };
  },
};
</script>
