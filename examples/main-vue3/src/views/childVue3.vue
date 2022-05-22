<template>
  <rm-app
    name="child-vue3"
    url="http://localhost:3002"
    base-url="/vue3"
    :data="info"
    @dataChanged="handleDataChanged"
  ></rm-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'childVue3',
  setup() {
    let info = {};
    return {
      info,
      handleDataChanged(e: any) {
        console.log('[main]子应用vue3传输的数据', e.detail);
      },
    };
  },
  mounted() {
    const win: any = window;
    setTimeout(() => {
      win.CommCenterForBase.setData('child-vue3', { msg: 'from base' });
      this.info = { name: 'refrain', age: 18 };
    }, 2000);
  },
});
</script>
