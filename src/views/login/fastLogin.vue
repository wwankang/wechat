<template>
  <div
    class="page"
    style="height: 400px;width:280px;overflow: hidden;border-radius: 10px;margin: 20px auto;"
  >
    <div style="background-color: white;text-align: right">
      <i
        class="weui-icon-close-thin"
        title="关闭"
        style="cursor: pointer;width: 20px;height: 20px;margin: 10px"
        @click="closeLoginWin()"
      ></i>
    </div>
    <div class="weui-msg" style="padding-top: 60px">
      <div class="weui-msg__icon-area">
        <img width="80" height="80" :alt="user.username" :src="user.img" />
      </div>
      <div class="weui-msg__text-area">
        <p class="weui-msg__desc">{{ user.username }}</p>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <a href="javascript:" class="weui-btn weui-btn_primary" @click="login"
            >登录</a
          >
        </p>
      </div>
      <div class="weui-msg__tips-area">
        <p class="weui-msg__tips">
          <a href="javascript:" @click="toLogin">切换账号</a>
        </p>
      </div>
      <!--<div class="weui-msg__extra-area">
                <div class="weui-footer">
                    <p class="weui-footer__links">
                        <a href="javascript:" class="weui-footer__link">底部链接文本</a>
                    </p>
                    <p class="weui-footer__text">Copyright &copy; 2008-2016 weui.io</p>
                </div>
            </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "FastLogin",

  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {},
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/index");
    },
    closeLoginWin() {}
  }
};
</script>

<style scoped></style>
