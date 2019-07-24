<template>
  <div class="container">
    <form class="form" @submit.prevent>
      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Имя"
          v-model.trim="name"
          :class="{'isInvalid': $v.name.$error}"
          @blur="$v.name.$touch()"
        />
      </div>

      <div class="invalidFeedback">
        <div class="invalidFeedback__info" v-if="!$v.name.naneError">{{nameError}}</div>
      </div>

      <div class="form__field">
        <input
          class="form__input"
          type="text"
          placeholder="Фамилия"
          v-model.trim="surname"
          :class="{'isInvalid': $v.surname.$error}"
          @blur="$v.surname.$touch()"
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
          placeholder="Role"
          v-model.trim="role"
          :class="{'isInvalid': $v.role.$error}"
          @blur="$v.role.$touch()"
        />
      </div>

      <div class="invalidFeedback">
        <div class="invalidFeedback__info" v-if="!$v.role.role">Введена неверная роль.</div>
        <div class="invalidFeedback__info" v-if="!$v.role.roleError">{{roleError}}</div>
      </div>

      <button class="form__button" v-on:click="updateUserData()">Изменить данные</button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      surname: "",
      name_customer: "",
      role: "",
      roleError: "",
      nameError: "",
      surnameError: "",
      name_customerError: ""
    };
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
    role: {
      required
    }
  },
  methods: {
    updateUserData() {
      let url = "http://68.183.119.148/api/edit-user";

      let config = {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      };

      let userData = {
        name: this.name,
        surname: this.surname,
        name_customer: this.name_customer,
        role: this.role
      };

      axios
        .post(url, userData, config)
        .then(response => {
          console.log(response);
        })
        .catch(error => {});
    }
  },
  created: function getUserData() {
    let url = "http://68.183.119.148/api/get-user";

    let config = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };
    console.log(config);

    axios
      .get(url, config)
      .then(response => {
        console.log(response);
      this.name = response.data.user.name; 
      this.surname = response.data.user.surname;
      this.name_customer = response.data.user.name_customer;
      this.role = response.data.user.role;

      })
      .catch(error => {});
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

