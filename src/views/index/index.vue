<script>
import Card from "@/components/card";
import List from "@/components/list";
import SendText from "@/components/text";
import Message from "@/components/message";
import Toolbar from "@/components/toolbar";

export default {
  components: { Card, List, SendText, Message, Toolbar },
  computed: {
    currentId() {
      return this.$store.state.currentSessionId;
    }
  },
  created() {
    this.$store.commit("INIT_DATA");
  }
};
</script>

<template>
  <div id="index">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <toolbar></toolbar>
      <message v-if="currentId"></message>
      <send-text v-if="currentId"></send-text>
    </div>
  </div>
</template>
<style lang="less" scoped>
#index {
  margin: 20px auto;
  width: 800px;
  height: 600px;

  overflow: hidden;
  border-radius: 3px;

  .sidebar,
  .main {
    height: 100%;
  }
  .sidebar {
    float: left;
    width: 200px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
  .text {
    height: 20%;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .message {
    height: 75%;
    /*height: ~'calc(100% - 160px)';*/
  }
}
</style>
