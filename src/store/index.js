/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from "vue";
import Vuex from "vuex";
import { login } from "../api/login";
import { uploadImg } from "../api/user";

Vue.use(Vuex);

// const now = new Date()
const store = new Vuex.Store({
  state: {
    // 当前用户
    user: {},
    // 好友列表
    friends: [],
    sessions: [],
    // 当前选中的会话
    currentSessionId: null,
    // 过滤出只包含这个key的会话
    filterKey: ""
  },
  mutations: {
    INIT_DATA(state) {
      const data = localStorage.getItem("chat-session");
      if (data) {
        state.sessions = JSON.parse(data);
      }
    },
    // 页面推送消息
    SEND_MESSAGE(state, { content, success }) {
      debugger;
      let session = state.sessions.find(
        item => item.id === state.currentSessionId
      );
      if (!session) {
        const friend = state.friends.find(
          friend => friend.id === state.currentSessionId
        );
        state.sessions.push({
          id: state.currentSessionId,
          messages: [],
          user: friend,
          lastMsg: "",
          lastTime: new Date()
        });
        session = state.sessions.find(
          item => item.id === state.currentSessionId
        );
      }
      session.messages.push({
        content: content,
        date: new Date(),
        self: true,
        success: success
      });
      session.lastMsg = content;
      session.lastTime = new Date();
    },
    // 创建会话
    NEW_SESSION(state, id) {
      debugger;
      let session = state.sessions.find(item => item.id === id);
      if (session) {
        state.currentSessionId = id;
        console.log("选中会话已存在-用户:" + session.user.username);
        return;
      }

      const friend = state.friends.find(friend => friend.id === id);
      console.log("选中会话不存在-用户:" + friend.username + "创建会话");
      state.sessions.push({
        id: id,
        messages: [],
        user: friend,
        lastMsg: "",
        lastTime: new Date()
      });
      state.currentSessionId = id;
    },
    // 选择会话
    SELECT_SESSION(state, id) {
      state.currentSessionId = id;
    },
    // 搜索
    SET_FILTER_KEY(state, value) {
      state.filterKey = value;
    },
    // 用户和好友列表
    SET_USER(state, user) {
      state.user = user;
      const friends = user.friends;
      state.friends = friends;
      /*friends.forEach(friend => {
        const session = {
          id: friend.id,
          user: {
            username: friend.username,
            img: friend.img,
            id: friend.id
          },
          messages: []
        };
        state.sessions.push(session);
      });*/
    }
  },
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            console.log("登录成功" + response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            commit("SET_USER", response.data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    UploadImg({ state }, img) {
      const data = {
        id: state.user.id + "",
        file: img
      };
      return new Promise((resolve, reject) => {
        uploadImg(data)
          .then(response => {
            if (response.code === 200) {
              state.user.img = img;
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
});

store.watch(
  state => state.sessions,
  val => {
    console.log("CHANGE: ", val);
    localStorage.setItem(
      "chat-session" + this.$store.user.id,
      JSON.stringify(val)
    );
  },
  {
    deep: true
  }
);
export default store;
