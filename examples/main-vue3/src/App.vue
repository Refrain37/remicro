<template>
  <div class="layout flex-column">
    <div class="header bold fontsize-24 pt10 pb10">Remicro.js</div>
    <div class="main-wrapper mt10 flex-row">
      <!-- sidebar -->
      <div class="sidebar" style="min-width: 200px">
        <div class="menu" style="width: 100%">
          <div
            v-for="(item, index) in menu"
            :class="[
              'menu-item',
              'fontsize-16',
              item.path === currMenu ? 'activeMenu' : '',
            ]"
            :key="index"
            @click="navigate(item.path)"
          >
            <rm-icon class="mr5" :name="item?.meta?.icon"></rm-icon>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <!-- content -->
      <div class="content flex-1 ml10">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue';
import router, { routes } from './router/index';

export default defineComponent({
  name: 'App',
  setup() {
    const menu = getMenu();
    const navigate = (path: string) => {
      router.push(path);
    };
    const currMenu = computed(() => {
      const currMenu = router.currentRoute;
      return currMenu.value.path;
    });

    return {
      menu,
      navigate,
      currMenu,
    };
  },
});

function getMenu() {
  return routes.map(d => d);
}
</script>

<style lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #eef5f9;

  .header {
    height: 56px;
    text-align: center;
    color: var(--color-primary);
    border-color: #fff;
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
  }

  .main-wrapper {
    .sidebar {
      background: #fff;
      height: 100%;

      .menu {
        .menu-item {
          padding: 10px 20px;
          cursor: pointer;
          color: var(--color-9);
          &:hover {
            color: var(--color-primary);
          }
        }

        .activeMenu {
          color: var(--color-primary);
        }
      }
    }

    .content {
      background: #fff;
      padding: 16px 16px 30px;
      height: calc(100vh - 56px);
      overflow-y: scroll;
    }
  }
}
</style>
