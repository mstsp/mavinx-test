<template>
    <div class="modalMessage">
      <div class="messageBlock">
        <p class="messageBlock__title">Вы успешно зарегистрировались!</p>
        <div class="messageBlock__center">
          <button class="messageBlock__confirmButton" @click="close()">OK</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    close() {
      this.$router.push("/authorization");
    }
  }
};
</script>

<style lang='scss' scoped>
.modalMessage {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: rgba(196, 196, 196, 0.3);
}

.messageBlock {
  width: 650px;
  height: 200px;
  background: #ffffff;
  border: 2px solid lightblue;
  box-shadow: 3px 4px 4px rgba(0, 102, 255, 0.25);
  border-radius: 15px;
  padding: 0 13px;

  &__confirmButton {
    width: 155px;
    height: 44px;
    display: block;
    position: relative;
    background-color: #809fff;
    border: 1px solid #809fff;
    border-radius: 20px;

    font-size: 20px;
    line-height: 21px;
    color: #ffffff;
    margin: 0 auto;

    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      box-shadow: 3px 4px 4px rgba(0, 102, 255, 0.25);
      border: 1px solid #5876ce;
    }
  }

  &__title {
    font-size: 36px;
    line-height: 36px;
    color: rgba(0, 0, 0, 0.5);
    margin: 40px auto;
    text-align: center;
  }

  &__center {
    margin: 0 auto;
  }
}
</style>

