<template>
  <div class="flex-row">
    <rm-btn
      type="primary"
      content="向子应用发起数据"
      @click="sendMessage()"
    ></rm-btn>
    <rm-btn
      class="ml20"
      type="primary"
      content="修改主体色为红色"
      @click="changeColor()"
    ></rm-btn>
  </div>
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
    let info = reactive({});
    const sendMessage = () => {
      const win: any = window;
      win.CommCenterForBase.setData('child-vue3', {
        msg: 'from base',
        num: 123,
      });
    };

    return {
      info,
      sendMessage,
      handleDataChanged(e: any) {
        console.log('[main]子应用vue3传输的数据', e.detail);
        window.alert(`[main]子应用vue3传输的数据：${e.detail.msg}`);
      },
      changeColor() {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', 'red');
      },
    };
  },
  mounted() {
    // const win: any = window;
    // setTimeout(() => {
    //   win.CommCenterForBase.setData('child-vue3', { msg: 'from base' });
    //   this.info = { name: 'refrain', age: 18 };
    // }, 2000);
  },
});
</script>
