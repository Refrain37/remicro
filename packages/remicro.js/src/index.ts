export * from '@remicro.js/utils';

/* 微前端应用组件 */
import { defineApp } from '@remicro.js/app';

/* 通用 */
import { defineButton } from '@remicro.js/button';
import { defineIcons } from '@remicro.js/icons';

/* 数据输入 */
import { defineInput } from '@remicro.js/input';

/* 数据展示 */
import { defineTag } from '@remicro.js/tag';
import { defineList } from '@remicro.js/list';

/* 交互反馈 */
import { defineLoading } from '@remicro.js/loading';
import { defineModal } from '@remicro.js/modal';

function useRemicro() {
  defineApp();
  defineButton();
  defineIcons();
  defineInput();
  defineTag();
  defineList();
  defineLoading();
  defineModal();
}

export {
  useRemicro,
  defineApp,
  defineButton,
  defineIcons,
  defineInput,
  defineTag,
  defineList,
  defineLoading,
  defineModal,
};
