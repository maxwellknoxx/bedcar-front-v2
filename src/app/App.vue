<template>
  <div id="app">
    <header>
      <nav v-if="loggingIn" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
          <router-link to="/" class="nav-item nav-link">Mission Control</router-link>
          <router-link to="/customers" class="nav-item nav-link">Register Customer</router-link>
          <router-link to="/showCustomers" class="nav-item nav-link">Show Customers</router-link>
          <router-link to="/payments" class="nav-item nav-link">Payments</router-link>
          <router-link to="/admin" class="nav-item nav-link">Admin</router-link>
          <router-link to="/statistics" class="nav-item nav-link">Statistics</router-link>
          <a @click="logout" class="nav-item nav-link">Logout</a>
        </div>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { userService } from "../_services/index";
import { router, Role } from "../_helpers/index";
export default {
  name: "app",

  data() {
    return {
      user: ""
    };
  },

  mounted() {
    this.user = localStorage.getItem("userData");
    console.log(( JSON.stringify(this.user.data)));
  },

  computed: {
    alert() {
      return this.$store.state.alert;
    },

    loggingIn() {
      if (localStorage.getItem("isLogged")) {
        return true;
      } else {
        return false;
      }
    },

    isAdmin() {
      return this.user.role.name === Role.Admin;
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.$store.dispatch("alert/clear");
    }
  },

  methods: {
    logout() {
      userService.logout();
      router.push("/");
    }
  }
};
</script>

<style>
.bs-example {
  margin: 20px;
}
</style>
