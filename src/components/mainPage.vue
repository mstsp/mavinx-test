<template>
  <div class="container">
    main-page
    <button v-on:click="getUserRole()">Click</button>
    <button v-on:click="logOut()">LogOut</button>
  </div>
</template>

<script>
import profile from "./profile.vue";
import axios from "axios";

export default {
  data() {
    return {
      userRole: ""
    };
  },
  components: {
    profile
  },
  methods: {
    getUserRole() {
      this.userRole = JSON.parse(
        JSON.stringify(localStorage.getItem("userRole"))
      );

      this.$router.push("/profile");
    },
    logOut() {
      let url = "http://68.183.119.148/api/logout";

      let config = {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };
      console.log(config);

      axios
        .post(url, {}, config)
        .then(response => {
          console.log("OK");
          localStorage.removeItem("token");
          localStorage.removeItem("userRole");
          this.$router.push("/authorization");
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang='scss' scoped>
.container {
  position: absolute;
  background-color: grey;
  height: 100%;
  width: 100%;
}
</style>

