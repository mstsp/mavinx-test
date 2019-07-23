<template>
  <div id="app">
    <registration></registration>
  </div>
</template>

<script>
import registration from './components/registrationForm.vue';
export default {
  data() {
    return {

    }
  },
  components: {
    registration
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
