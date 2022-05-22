<template>
  <!-- <micro-opts-bar></micro-opts-bar> -->
  <rm-app
    name="child-react"
    url="http://localhost:3001"
    :data="info"
    @dataChanged="handleDataChanged"
  ></rm-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MicroOptsBar from '../components/MicroOptsBar/index.vue';

export default defineComponent({
  name: 'childVue3',
  components: {
    MicroOptsBar,
  },
  setup() {
    const info = {
      name: 'refrain',
      age: 18,
    };

    return {
      info,
      handleDataChanged(e: any) {
        console.log('data changed', e);
      },
    };
  },
});
</script>
