<script>
export default {
  filters: {
    // 将日期过滤为 hour:minutes
    time(date) {
      if (typeof date === "string") {
        date = new Date(date);
      }
      return date.getHours() + ":" + date.getMinutes();
    }
  },
  data() {
    return {
      showClass: "list",
      tabs: [
        {
          index: 1,
          title: "聊天",
          active: true,
          showClass: "list"
        },
        {
          index: 2,
          title: "联系人",
          active: false,
          showClass: "contact"
        }
      ]
    };
  },
  computed: {
    friends() {
      return this.$store.state.friends;
    },
    sessions() {
      return this.$store.state.sessions.filter(session =>
        session.user.username.includes(this.$store.state.filterKey)
      );
    },
    currentId() {
      return this.$store.state.currentSessionId;
    },
    session() {
      return this.$store.state.sessions.find(
        session => session.id === this.$store.state.currentSessionId
      );
    }
  },
  methods: {
    newSession(id) {
      this.$store.commit("NEW_SESSION", id);
      this.to(1);
    },
    selectSession(id) {
      // this.$router.push("/message/"+id)
      this.$store.commit("SELECT_SESSION", id);
    },
    to(id) {
      debugger;
      this.tabs.forEach(function(tab) {
        if (tab.index === id) {
          tab.active = true;
        } else {
          tab.active = false;
        }
      });
      let tab = this.tabs.find(tab => tab.index === id);
      this.showClass = tab.showClass;
    }
  }
};
</script>

<template>
  <div>
    <div class="tab">
      <div v-for="tab in tabs" :key="tab.index" class="tab_item">
        <a :class="{ active: tab.active }" @click="to(tab.index)">{{
          tab.title
        }}</a>
      </div>
    </div>
    <div class="list" :style="showClass === 'list' ? 'display:none' : ''">
      <ul>
        <li
          v-for="friend in friends"
          :key="friend.id"
          :class="{ active: friend.id === currentId }"
          @click="newSession(friend.id)"
        >
          <img
            class="avatar"
            width="30"
            height="30"
            :alt="friend.username"
            :src="friend.img"
          />
          <p class="name">{{ friend.username }}</p>
        </li>
      </ul>
    </div>
    <div class="list" :style="showClass === 'contact' ? 'display:none' : ''">
      <div
        v-for="item in sessions"
        :key="item.id"
        class="chat_item"
        :class="{ active: item.id === currentId }"
        @click="selectSession(item.id)"
      >
        <div class="ext">
          <p class="attr">{{ item.lastTime | time }}</p>
        </div>
        <div class="avatar">
          <img class="img" :src="item.user.img" />
        </div>
        <div class="info">
          <h3 class="nickname">
            <span class="nickname_text">{{ item.user.username }}</span>
          </h3>
          <p class="msg">{{ item.lastMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.list {
  li {
    padding: 12px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }

    &.active {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  .avatar,
  .name {
    vertical-align: middle;
    text-align: left;
  }

  .avatar {
    border-radius: 2px;
  }

  .name {
    display: inline-block;
    margin: 0 0 0 15px;
  }
}
.chat_item {
  overflow: hidden;
  padding: 12px 18px 11px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  position: relative;
}

.chat_item .ext {
  float: right;
  color: #6b6f7c;
  font-size: 13px;
  text-align: right;
}

.chat_item .avatar {
  float: left;
  margin-right: 10px;
  position: relative;
}

.chat_item .info {
  overflow: hidden;
}

.chat_item .ext .attr {
  height: 19px;
  line-height: 1.5;
}

.chat_item .avatar .img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
}

.chat_item .info .nickname {
  font-weight: 400;
  font-size: 13px;
  color: #fff;
  line-height: 20px;
}

.msg {
  color: #fff;
}

.chat_item .info .msg {
  color: #989898;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  height: 1.5em;
}

.chat_item.active {
  background: #3a3f45;
}

.tab {
  height: 30px;
}

.tab .tab_item {
  float: left;
  width: 50%;
  position: relative;
  text-align: center;
}

.tab_item .active {
  color: #2ecc71;
}

a {
  cursor: pointer;
}
</style>
