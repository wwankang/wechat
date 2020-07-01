<template>
  <form id="login_form" class="box">
    <h1>登录</h1>
    <input
      id="username"
      v-model="formData.username"
      type="text"
      name="username"
      placeholder="用户名"
    />
    <input
      id="password"
      v-model="formData.password"
      type="password"
      name="password"
      placeholder="密码"
    />
    <input id="loginBtn" value="登录" @click="submit()" />
  </form>
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      console.log(this.formData);
      if (this.formData.username === "") {
        return false;
      }

      this.$store
        .dispatch("Login", this.formData)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
      /*   request({
                url: '/user/login',
                method: 'post',
                data: {
                    username,
                    password
                }
            }).then()*/
      /* const user = {
            name: this.formData.username,
            img: 'dist/images/1.jpg'
          }
          console.log('当前用户：' + user)
          this.$store.commit('SET_USER', user)
          this.$router.push('/index')*/
    }
  }
};
</script>
<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #34495e;
}
.box {
  width: 300px;
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #191919;
  text-align: center;
  border-radius: 20px;
  opacity: 0.9;
}
.box h1 {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}
.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
}
/*   .box input[type="text"]:focus,.box input[type="password"]:focus{
        width: 280px;
        border-color: #2ecc71;
    }*/
.box input[id="loginBtn"] {
  border: 0;
  background: none;
  display: block;
  margin: 20px auto;
  text-align: center;
  border: 2px solid #2ecc71;
  padding: 10px 5px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  cursor: pointer;
}
.box input[id="loginBtn"]:hover {
  background: #2ecc71;
}
</style>
