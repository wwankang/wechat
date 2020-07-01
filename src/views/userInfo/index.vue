<template>
  <div class="page" style="height: 100%;overflow: hidden;border-radius: 10px;">
    <div class="weui-msg" style="padding-top: 60px">
      <div class="weui-msg__icon-area">
        <img
          width="80"
          height="80"
          :alt="user.username"
          :src="imgUrl"
          @click="uploadHeadImg"
        />
      </div>
      <div class="weui-msg__text-area">
        <p class="weui-msg__desc">{{ user.username }}</p>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <a
            href="javascript:"
            class="weui-btn weui-btn_primary"
            @click="sureChange"
            >确定更换</a
          >
        </p>
      </div>
      <div class="weui-msg__tips-area">
        <p class="weui-msg__tips">点击图片可更换头像</p>
      </div>
    </div>
    <div class="weui-uploader__input-box" style="display: none">
      <input
        id="uploaderInput"
        class="weui-uploader__input"
        type="file"
        accept="image/*"
        multiple
        @change="changeImg"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      imgUrl: this.$store.state.user.img,
      file: null
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    sureChange() {
      const that = this;
      this.$store
        .dispatch("UploadImg", this.imgUrl)
        .then(() => {
          // remote.getCurrentWindow().close()
          that.$weui.weuiToast("上传成功", 1000);
        })
        .catch(() => {});
    },
    logout() {
      this.websocket.close();
      this.$router.push("/");
    },
    // 打开图片上传
    uploadHeadImg: function() {
      this.$el.querySelector("#uploaderInput").click();
    },
    // 将头像显示
    changeImg(e) {
      const $target = e.target || e.srcElement;
      const file = $target.files[0];
      this.file = file;
      var reader = new FileReader();
      reader.onload = data => {
        const res = data.target || data.srcElement;
        this.imgUrl = res.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style scoped></style>
