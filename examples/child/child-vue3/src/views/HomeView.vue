<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="子应用 Vue3.2" />
    <h1>{{ num }}</h1>
    <rm-btn
      style="margin-top: 20px; width: 200px; display: inline-block"
      content="发送消息给主应用"
      @click="sendMessage()"
    ></rm-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  setup() {
    const win: any = window;
    const num = ref(0);
    win?.commCenter?.addDataListener((e: any) => {
      console.log('[child-vue3]基座应用传输的数据：', e);
      const { num: val } = e;
      num.value = parseInt(val) + num.value;
    });
    return {
      sendMessage() {
        win?.commCenter?.dispatch({
          msg: 'from child-vue3',
        });
      },
      num,
    };
  },
  name: 'HomeView',
  components: {
    HelloWorld,
  },
});
</script>

<style></style>
