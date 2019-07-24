<template>
  <div class="container">
    main-page
    <button v-on:click="getUserRole()">Click</button>
  </div>
</template>

<script>
import profile from "./profile.vue";

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

        this.$router.push('/profile');
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

