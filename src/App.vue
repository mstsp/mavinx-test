<template>
  <div id="app">
    <registration></registration>
<!-- <authorization></authorization> -->
  </div>
</template>

<script>
import registration from './components/registrationForm.vue';
import authorization from './components/authorization.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    registration,
    authorization
  }

}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;
  text-align: center;
}
</style>
