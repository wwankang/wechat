<template>
  <div class="toolbar">
    <span class="chat_title">{{ title }}</span>
    <!--        <i class="weui-icon-close-thin btn"></i>-->
    <!--    <div class="icon_sp_area">
              <i class="weui-icon-circle"></i>
              <i class="weui-icon-success"></i>
              <i class="weui-icon-success-circle"></i>
              <i class="weui-icon-success-no-circle"></i>
              <i class="weui-icon-success-no-circle-thin"></i>
              <i class="weui-icon-warn"></i>
              <i class="weui-icon-info-circle"></i>
              <i class="weui-icon-waiting-circle"></i>
              <i class="weui-icon-download"></i>
              <i class="weui-icon-search"></i>
              <i class="weui-icon-cancel"></i>
              <i class="weui-icon-clear"></i>
              <i class="weui-icon-arrow-bold"></i>
              <i class="weui-icon-arrow"></i>
            </div>
            <div class="icon_sp_area">
              <i class="weui-icon-close"></i>
              <i class="weui-icon-close-thin"></i>
              <i class="weui-icon-back-arrow"></i>
              <i class="weui-icon-back-arrow-thin"></i>
              <i class="weui-icon-back"></i>
              <i class="weui-icon-back-circle"></i>
            </div>-->
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {};
  },
  computed: {
    title() {
      const session = this.$store.state.sessions.find(
        session => session.id === this.$store.state.currentSessionId
      );
      if (session) {
        return session.user.username;
      } else {
        return "未选择会话";
      }
    }
  },
  methods: {
    min() {},
    close() {}
  }
};
</script>

<style scoped>
.toolbar {
  text-align: center;
  padding-top: 10px;
  height: 5%;
}

.btn {
  margin-right: 5px;
  cursor: pointer;
  float: right;
}
</style>
