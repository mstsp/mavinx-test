<template>
  <div>
    <div class="container">
      <nav class="navbar">
        <div class="header">
          <div class="main-nav main-nav--left">
            <ul class="main-nav__menu">
              <li class="main-nav__item">
                <a href="#" class="main-nav__link">Exports</a>
              </li>
              <li class="main-nav__item main-nav__item-left_border">
                <a href="#" class="main-nav__link">
                  <input class="main-nav__search" type="text" placeholder="Поиск экспертов, навыки" />
                </a>
              </li>
            </ul>
          </div>

          <div class="main-nav main-nav--right">
            <ul class="main-nav__menu">
              <li class="main-nav__item">
                <a href="#" class="main-nav__link">Эксперты</a>
              </li>
              <li class="main-nav__item">
                <a href="#" class="main-nav__link">Вопросы</a>
              </li>
              <li class="main-nav__item main-nav__item-right_border">
                <a href="#" class="main-nav__link">О нас</a>
              </li>
              <li class="main-nav__item main-nav__item-right_border">
                <a href="#" class="main-nav__link">Создать проект</a>
              </li>
              <li class="main-nav__item">
                <p class="main-nav__link" v-on:click="dropdown = !dropdown">Аватар</p>
                <div class="main-nav__dropdown" v-if="dropdown">
                  <p class="main-nav__dropdown-item" v-on:click="getUserRole()">Личный кабинет</p>
                  <p class="main-nav__dropdown-item" v-on:click="logOut()">Выход</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="page">
        <div class="sidebar"></div>
        <div class="content">
          <div class="items">
            <div class="content-item" v-for="(number, index) in data" :key="index">
              <div class="content-item__left-content">
                <h1 class="content-item__title">Дизайн cайта UI и UX</h1>
                <p
                  class="content-item__description"
                >Рекламные компании говорят, что реклама необходима и важна. Он информирует людей о новых продуктах. Рекламные циты на улице делают нашу среду яркой.</p>
                <a class="content-item__link" href="#">#Landing-page</a>
                <a class="content-item__link" href="#">#Логотип</a>
                <a class="content-item__link" href="#">#Промо-сайт</a>
              </div>

              <div class="content-item__right-content">
                <center>
                  <p class="content-item__right-content__bill">1 840$</p>
                  <p class="content-item__right-content__term">1-2 месяца</p>
                </center>      
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profile from "./profile.vue";
import axios from "axios";

export default {
  data() {
    return {
      userRole: "",
      dropdown: false,
      data: [1, 2, 3, 4, 5]
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
  height: 100%;
  width: 100%;
  padding: 0 50px;
}

.main-nav {
  display: flex;

  &__menu {
    display: block;
  }

  &--left {
    float: left;
  }

  &--right {
    float: right;
  }

  &__item {
    display: inline-block;
    padding: 20px 10px;
    padding-right: 30px;
    font-size: 18px;
    margin-top: 10px;
    margin-left: 20px;
    line-height: normal;
    vertical-align: middle;

    &-left_border {
      border-left: 1px solid #bfbfbf;
      padding-left: 40px;
    }

    &-right_border {
      border-right: 1px solid #bfbfbf;
    }
  }

  &__search {
    border: none;
    outline: none;
    text-indent: 25px;
    background: url("../../img/search.png") 0 0 no-repeat;
    background-size: 16px 16px;
    width: 120%;

    &::placeholder {
      color: #afafaf;
    }
  }

  &__link {
    text-decoration: none;
    cursor: pointer;
  }

  &__dropdown {
    position: absolute;
    z-index: 1;
    background-color: white;
    top: 50px;
    right: 50px;
    padding: 20px 20px;
  }

  &__dropdown-item {
    cursor: pointer;
    margin-bottom: 10px;
    text-align: left;
  }
}

.content-item {
  text-align: left;
  margin-top: 20px;
  margin-left: 55px;
  padding: 15px;

  &__title {
    font-weight: bold;
    font-size: 22px;
  }

  &__description {
    color: #878787;
    font-size: 18px;
    width: 80%;
  }

  &__link {
    margin-right: 10px;
    color: black;
  }

  &__left-content {
    border-right: 1px solid #bfbfbf;
    margin-right: 100px;

    hr {
      color: #bfbfbf;
    }
  }

  &__right-content {
    padding: 10px;
    display: inline-block;
    vertical-align: middle;
    transform: translate(-50%, 25%);
    white-space: pre;

    &__bill {
      font-size: 24px;
      margin: 0 auto;
    }

    &__term {
      font-size: 20px;
      margin: 0 auto;
    }
  }
}

.page{
  position: relative;
}
</style>

