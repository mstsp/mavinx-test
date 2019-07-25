<template>
  <div class="container">
    <div class="registration">
      <p class="registration__title">Регистрация</p>
      <input
        class="registration__input"
        type="radio"
        id="pickCustomer"
        name="typeRegistration"
        checked
        hidden
      />
      <label
        class="registration__label registration__label--right"
        for="pickCustomer"
        @click="component='registrationCustomer'"
      >Заказчик</label>
      <input
        class="registration__input"
        type="radio"
        id="pickSupplier"
        name="typeRegistration"
        hidden
      />
      <label
        class="registration__label registration__label--left"
        for="pickSupplier"
        @click="component='registrationSupplier'"
      >Поставщик</label>

      <div class="registration__component">
        <keep-alive>
          <component :is="component"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import RegistrationCustomer from "./registrationCustomer";
import RegistrationSupplier from "./registrationSupplier";

export default {
  data() {
    return {
      component: "RegistrationCustomer"
    };
  },
  components: {
    RegistrationCustomer,
    RegistrationSupplier
  }
};
</script>

<style scoped lang="scss">
input[type="radio"]:checked + label {
  border-bottom: solid 2px #809fff;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.registration {
  min-width: 25%;
  min-height: 30%;
  border: 2px solid lightblue;
  box-shadow: 3px 4px 4px rgba(0, 102, 255, 0.25);
  padding: 20px;
  border-radius: 15px;

  &__title {
    color: #809fff;
    text-align: center;
    font-size: 28px;
    margin: 0;
    margin-bottom: 20px;
  }

  &__label {
    color: #809fff;
    font-size: 20px;
    // position: relative;

    &--right {
      position: relative;
      top: 0;
      right: 60px;
    }

    &--left {
      position: relative;
      top: 0;
      left: 60px;
    }
  }

  &__component {
    margin-top: 20px;
  }
}
</style>
