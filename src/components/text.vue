<script>
export default {
  data() {
    return {
      content: "",
      aisle: 1
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    session() {
      return this.$store.state.sessions.find(
        session => session.id === this.$store.state.currentSessionId
      );
    }
  },
  created() {
    this.$nextTick(function() {
      this.conectWebSocket();
    });
  },
  destroyed() {
    this.websocket.close();
  },
  methods: {
    sendMessage(content) {
      if (this.websocket.readyState === 1) {
        // 发送消息
        var socketMsg = { msg: content, toUser: this.session.user.username };
        if (this.aisle === "") {
          // 群聊.
          socketMsg.type = 0;
        } else {
          // 单聊.
          socketMsg.type = 1;
        }
        this.websocket.send(JSON.stringify(socketMsg));
        this.$store.commit("SEND_MESSAGE", { content: content, success: true });
      } else {
        this.$store.commit("SEND_MESSAGE", {
          content: content,
          success: false
        });
      }
    },
    onKeyup(e) {
      if (e.keyCode === 13 && this.content.length) {
        this.sendMessage(this.content);
        this.content = "";
      }
    },
    conectWebSocket: function() {
      console.log("建立连接");
      // 判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        this.websocket = new WebSocket(
          "ws://115.28.130.238:8888/websocket/" + this.user.username
        );
      } else {
        alert("不支持建立socket连接");
      }
      // 连接发生错误的回调方法
      this.websocket.onerror = function() {};
      // 连接成功建立的回调方法
      this.websocket.onopen = function(event) {
        console.log(event);
      };
      // 接收到消息的回调方法
      const that = this;
      this.websocket.onmessage = function(event) {
        debugger;
        const object = JSON.parse(event.data);
        console.log(object);
        if (object.type === 0) {
          // 提示连接成功
          console.log("连接成功");
        }
        if (object.type === 1) {
          // 显示消息
          console.log("收到消息!");
          that.$store.commit("RECV_MESSAGE", object);
        }
      };
      // 连接关闭的回调方法
      this.websocket.onclose = function() {};
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        this.websocket.close();
      };
    }
  }
};
</script>

<template>
  <div class="text">
    <textarea
      v-model="content"
      placeholder="按 Enter 发送"
      @keyup="onKeyup"
    ></textarea>
  </div>
</template>

<style lang="less" scoped>
.text {
  /*height: 160px;*/
  border-top: solid 1px #ddd;

  textarea {
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei", serif;
    resize: none;
  }
}
</style>
