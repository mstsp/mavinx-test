<template>
  <div class="container">
    <form class="form" @submit.prevent="onSubmit">
      <p class="form__title">Авторизация</p>

      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Email"
          v-model.trim="email"
          :class="{'isInvalid': $v.email.$error}"
          @blur="$v.email.$touch()"
          v-on:focus="emailError = ''"
        />
      </div>

      <div class="invalidFeedback">
        <div
          class="invalidFeedback__info"
          v-if="!$v.email.email"
        >Введена неверная электронная почта.</div>
        <div class="invalidFeedback__info" v-if="!$v.email.emailError">{{emailError}}</div>
      </div>

      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Пароль"
          v-model.trim="password"
          :class="{'isInvalid': $v.password.$error}"
          @blur="$v.password.$touch()"
          v-on:focus="passwordError = ''"
        />
      </div>

      <div class="invalidFeedback">
        <div
          class="invalidFeedback__info"
          v-if="!$v.password.minLength"
        >Минимальная длина пароля {{ 6 }} символов. Введено {{ password.length }}</div>
        <div class="invalidFeedback__info" v-if="!$v.password.passwordError">{{passwordError}}</div>
      </div>

      <div class="invalidFeedback invalidFeedback--center">
        <div
          class="invalidFeedback__info invalidFeedback__info--center"
          v-if="error != ''"
        >{{error}}</div>
      </div>

      <button class="form__button">Войти</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import axios from "axios";
//import { mapMutations } from "vuex";


export default {
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      error: ""
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    //...mapMutations(["saveTokenMutation", "saveUserRoleMutation"]),

    onSubmit() {
      let url = "http://68.183.119.148/api/login";
      let userData = {
        email: this.email,
        password: this.password
      };
      console.log(userData);
      axios
        .post(url, userData)
        .then(response => {
          console.log(response);
          if(response.data.status == true) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userRole", response.data.user.role);
            this.$router.push('/main');
          } else { 
            if (
              response.data.message.email
                .toString()
                .toLowerCase()
                .includes("required")
            ) {
              this.emailError = "Поле Email обязательно";
            }
          
            if (
              response.data.message.password
                .toString()
                .toLowerCase()
                .includes("required")
            ) {
              this.passwordError = "Введите пароль";
            }
          } 
        })
        .catch(error => {
          this.error = "Введен неверный логин или пароль";
          console.log(error);
        });
    }
  }
};
</script>

<style lang='scss' scoped>
* {
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
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

  &__field {
    margin-bottom: 24px;
  }

  &__input {
    height: 45px;
    width: 350px;
    border-radius: 15px;
    padding: 5px 20px;
    border: 1px solid lightblue;
    box-shadow: 2px 3px 3px rgba(0, 102, 255, 0.25);

    &::placeholder {
      color: #809fff;
    }

    &:focus {
      outline: none;
      border: 1px solid #809fff;
    }

    &:hover {
      border: 2px solid lightblue;
      box-shadow: 3px 4px 4px rgba(0, 102, 255, 0.25);
    }
  }

  &__button {
    height: 45px;
    width: 350px;
    border-radius: 15px;
    border: 1px solid #809fff;
    background-color: #809fff;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-top: 30px;

    cursor: pointer;

    &:focus {
      outline: none;
    }

    &:hover {
      box-shadow: 3px 4px 4px rgba(0, 102, 255, 0.25);
      border: 1px solid #5876ce;
    }
  }
}

.isInvalid {
  border: 1px solid #d24a43;
}

.invalidFeedback {
  font-size: 10px;
  color: #d24a43;
  margin-top: -20px;
  height: 24px;

  &--center {
    font-size: 14px;
  }

  &__info {
    text-align: left;
    padding-left: 10px;

    &--center {
      text-align: center;
    }
  }
}
</style>

