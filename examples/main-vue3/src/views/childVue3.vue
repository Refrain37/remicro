<template>
  <rm-app
    name="child-vue3"
    url="http://localhost:3002"
    base-url="/vue3"
  ></rm-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'childVue3',
});
</script>
