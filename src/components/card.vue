<script>
export default {
  data() {
    return {
      imgUrl: this.$store.state.user.img
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    filterKey() {
      return this.$store.state.filterKey;
    }
  },
  created() {},
  methods: {
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector("#hiddenInput").click();
    },
    // 将头像显示
    changeImg(e) {
      const $target = e.target || e.srcElement;
      const file = $target.files[0];
      var reader = new FileReader();
      reader.onload = data => {
        const res = data.target || data.srcElement;
        this.user.img = res.result;
      };
      reader.readAsDataURL(file);
    },
    showUserInfo(e) {
      debugger;
      const userInfo = document.getElementById("userInfo");
      if (userInfo.style.display !== "none") return;
      userInfo.style.left = e.x + "px";
      userInfo.style.top = e.y + "px";
      userInfo.style.display = "";
    },
    onKeyup(e) {
      this.$store.commit("SET_FILTER_KEY", e.target.value);
    },
    logout() {
      this.$router.push("/");
    },
    sureChange() {
      const that = this;
      this.$store
        .dispatch("UploadImg", this.imgUrl)
        .then(() => {
          // remote.getCurrentWindow().close()
          that.$weui.weuiToast("上传成功", 1000);
        })
        .catch(() => {});
    }
  }
};
</script>

<template>
  <div class="card">
    <header id="" v-contextmenu:contextmenu @click="showUserInfo">
      <img
        class="avatar"
        width="40"
        height="40"
        :alt="user.username"
        :src="user.img"
        @click="showUserInfo"
      />
      <p class="name">{{ user.username }}</p>
    </header>
    <footer>
      <input
        class="search"
        type="text"
        placeholder="search user..."
        @keyup="onKeyup"
      />
    </footer>
    <v-contextmenu ref="contextmenu" theme="dark">
      <v-contextmenu-item @click="logout">退出</v-contextmenu-item>
    </v-contextmenu>

    <div
      id="userInfo"
      class="userInfo"
      style="display: none;text-align: center"
    >
      <div class="weui-msg__icon-area">
        <img
          width="80"
          height="80"
          :alt="user.username"
          :src="imgUrl"
          @click="uploadHeadImg"
        />
        <p class="weui-msg__desc">{{ user.username }}</p>
        <a
          href="javascript:"
          class="weui-btn weui-btn_primary"
          @click="sureChange"
          >确定更换</a
        >
        <p class="weui-msg__tips">点击图片可更换头像</p>
      </div>
      <div style="display: none">
        <input
          id="hiddenInput"
          type="file"
          accept="image/*"
          multiple
          @change="changeImg"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.card {
  padding: 12px;
  border-bottom: solid 1px #24272c;

  footer {
    margin-top: 10px;
  }

  .avatar,
  .name {
    vertical-align: middle;
  }

  .avatar {
    border-radius: 2px;
  }

  .name {
    display: inline-block;
    margin: 0 0 0 15px;
    font-size: 16px;
  }

  .search {
    padding: 0 10px;
    width: 100%;
    font-size: 12px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border: solid 1px #3a3a3a;
    border-radius: 4px;
    outline: none;
    background-color: #26292e;
  }
}
.userInfo {
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  outline: none;
  z-index: 999 !important;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
}
</style>
