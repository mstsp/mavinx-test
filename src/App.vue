<template>
  <div id="app">
    <registration></registration>
    <!-- <authorization></authorization> -->
    <!-- <mainPage></mainPage> -->
  </div>
</template>

<script>
import registration from './components/registrationForm.vue';
import authorization from './components/authorization.vue';
import mainPage from './components/mainPage.vue'; 

export default {
  data() {
    return {

    }
  },
  components: {
    registration,
    authorization,
    mainPage

  }

}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  width: 100%;
}

#app {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
