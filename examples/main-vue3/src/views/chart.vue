<template>
  <div class="flex-row">
    <rm-app
      class="flex-1"
      name="child-vue3"
      url="http://localhost:3002"
    ></rm-app>
    <rm-app
      class="flex-1"
      name="child-react"
      url="http://localhost:3001"
    ></rm-app>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
