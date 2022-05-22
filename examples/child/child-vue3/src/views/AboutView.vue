<template>
  <img alt="Vue logo" src="../assets/logo.png" />
  <div
    class="login-container flex-column align-items-center"
    style="width: 300px; margin: 0 auto"
  >
    <div>
      账户：<rm-input style="width: 250px" placeholder="请输入账号"></rm-input>
    </div>
    <div class="mt20">
      密码：<rm-input
        style="width: 250px"
        placeholder="请输入密码"
        type="password"
      ></rm-input>
    </div>
    <div style="width: 90%" class="mt20 flex-row justify-content-space-between">
      <rm-btn style="width: 120px" content="登录" type="primary"></rm-btn>
      <rm-btn style="width: 120px" content="注册"></rm-btn>
    </div>
  </div>
</template>
