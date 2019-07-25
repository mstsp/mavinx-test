<template>
  <div class="container">
    <form class="form" @submit.prevent="onSubmit">
      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Имя"
          v-model.trim="name"
          :class="{'isInvalid': $v.name.$error}"
          @blur="$v.name.$touch()"
          v-on:focus="nameError = ''"
        />
      </div>

      <div class="invalidFeedback">
        <div class="invalidFeedback__info" v-if="!$v.name.nameError">{{nameError}}</div>
      </div>

      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Фамилия"
          v-model.trim="surname"
          :class="{'isInvalid': $v.surname.$error}"
          @blur="$v.surname.$touch()"
          v-on:focus="surnameError = ''"
        />
      </div>

      <div class="invalidFeedback">
        <div class="invalidFeedback__info" v-if="!$v.surname.surnameError">{{surnameError}}</div>
      </div>

      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Название"
          v-model.trim="name_customer"
          :class="{'isInvalid': $v.name_customer.$error}"
          @blur="$v.name_customer.$touch()"
        />
      </div>

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
        <masked-input
          class="form__input"
          type="text"
          placeholder="Телефон"
          mask="\38 (111) 111-11-11"
          v-model.trim="phone"
          :class="{'isInvalid': $v.phone.$error}"
          @blur="$v.phone.$touch()"
          v-on:focus="phoneError = ''"
        />
      </div>

      <div class="invalidFeedback">
        <div class="invalidFeedback__info" v-if="!$v.phone.phoneError">{{phoneError}}</div>
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

      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Повторить пароль"
          v-model.trim="password_confirmation"
          :class="{'isInvalid': $v.password_confirmation.$error}"
          @blur="$v.password_confirmation.$touch()"
        />
      </div>

      <div class="invalidFeedback">
        <div
          class="invalidFeedback__info"
          v-if="!$v.password_confirmation.sameAs"
        >Пароли должны совпадать</div>
      </div>

      <button class="form__button">Регистрация</button>
    </form>
    <div v-if="modalMessage">
      <modalForm></modalForm>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
import modalForm from "./modalForm.vue";
import MaskedInput from "vue-masked-input";

export default {
  data() {
    return {
      name: "",
      surname: "",
      name_customer: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      emailError: "",
      phoneError: "",
      emailError: "",
      nameError: "",
      surnameError: "",
      passwordError: "",
      modalMessage: ""
    };
  },
  components: {
    modalForm,
    MaskedInput
  },
  validations: {
    name: {
      required
    },
    surname: {
      required
    },
    name_customer: {
      required
    },
    email: {
      required,
      email
    },
    phone: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password_confirmation: {
      sameAs: sameAs("password")
    }
  },
  methods: {
    onSubmit() {
      let url = "http://68.183.119.148/api/register";
      let newCustomer = {
        name: this.name,
        surname: this.surname,
        name_customer: this.name_customer,
        email: this.email,
        phone: this.phone,
        role: 2,
        password: this.password,
        password_confirmation: this.password_confirmation
      };
      axios
        .post(url, newCustomer)
        .then(response => {
          if (response.data.status == true) {
            this.modalMessage = true;
          }
          if (response.data.message.email) {
            if (
              response.data.message.email
                .toString()
                .toLowerCase()
                .includes("taken")
            ) {
              this.emailError = "Данный почтовый адрес уже зарегистрирован";
            } else if (
              response.data.message.email
                .toString()
                .toLowerCase()
                .includes("required")
            ) {
              this.emailError = "Поле Email обязательно";
            }
          }

          if (response.data.message.phone) {
            if (
              response.data.message.phone
                .toString()
                .toLowerCase()
                .includes("taken")
            ) {
              this.phoneError = "Данный телефон уже зарегистрирован";
            } else if (
              response.data.message.phone
                .toString()
                .toLowerCase()
                .includes("required")
            ) {
              this.phoneError = "Поле телефон обязательно";
            }
          }

          if (
            response.data.message.name
              .toString()
              .toLowerCase()
              .includes("required")
          ) {
            this.nameError = "Поле имя обязательно";
          }

          if (
            response.data.message.surname
              .toString()
              .toLowerCase()
              .includes("required")
          ) {
            this.surnameError = "Поле фамилия обязательно";
          }

          if (
            response.data.message.password
              .toString()
              .toLowerCase()
              .includes("characters")
          ) {
            this.passwordError = "Введите пароль";
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang='scss' scoped>
* {
  box-sizing: border-box;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
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

  &__info {
    text-align: left;
    padding-left: 10px;
  }
}
</style>

