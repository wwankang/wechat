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

    <div class="weui-form" style="padding-top: 5px">
      <div class="weui-form__text-area">
        <h2 class="weui-form__title">登录</h2>
      </div>
      <div class="weui-form__control-area">
        <div class="weui-cells__group weui-cells__group_form">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd" style="padding-left: 0px">
                <label class="weui-label">用户名</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  id="js_input2"
                  v-model="formData.username"
                  class="weui-input"
                  placeholder="请输入用户名"
                  name="username"
                />
              </div>
            </div>
            <div class="weui-cell weui-cell_active">
              <div class="weui-cell__hd" style="padding-left: 0px">
                <label class="weui-label">密码</label>
              </div>
              <div class="weui-cell__bd">
                <input
                  id="js_input3"
                  v-model="formData.password"
                  class="weui-input"
                  placeholder="请输入密码"
                  type="password"
                  name="password"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-form__opr-area">
        <a class="weui-btn weui-btn_default weui-btn_loading" @click="submit"
          ><i v-show="loading" class="weui-loading"></i>确定</a
        >
      </div>
    </div>
    <!--BEGIN toast-->
    <div id="toast" style="display: none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
        <i class="weui-icon-warn weui-icon_toast"></i>
        <p class="weui-toast__content">{{ msg }}</p>
      </div>
    </div>
    <!--end toast-->
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Login",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      },
      // 点击确认后按钮正在加载
      loading: false,
      msg: ""
    };
  },
  created() {},
  methods: {
    closeLoginWin() {},
    submit() {
      // 加载中
      this.loading = true;
      // const that = this

      if (this.formData.username === "" || this.formData.password === "") {
        const toast = document.getElementById("toast");
        if (toast.style.display !== "none") return;
        toast.style.display = "";
        this.msg = "用户名或者密码不能为空!";
        setTimeout(function() {
          toast.style.display = "none";
        }, 1000);
        this.loading = false;
        return;
      }

      this.$store
        .dispatch("Login", this.formData)
        .then(() => {
          this.$router.push("/index");
        })
        .catch(() => {});
      this.loading = false;
    }
  }
};
/*    $(function() {
      var $toast = $('#js_toast')
    var $input = $('#js_input')
    $input.on('input', function() {
        if ($input.val()) {
          $('#showTooltips').removeClass('weui-btn_disabled')
        } else {
          $('#showTooltips').addClass('weui-btn_disabled')
        }
      })
    $('#showTooltips').on('click', function() {
        if ($(this).hasClass('weui-btn_disabled')) return

        // toptips的fixed, 如果有`animation`, `position: fixed`不生效
        $('.page.cell').removeClass('slideIn')

        $toast.fadeIn(100)
        setTimeout(function() {
          $toast.fadeOut(100)
        }, 2000)
    })
})*/
</script>

<style scoped lang="less">
.weui-cells__group_form .weui-cell__hd {
  padding-left: 0;
}
.weui-cells__group_form .weui-label {
  max-width: 3em;
}
</style>
