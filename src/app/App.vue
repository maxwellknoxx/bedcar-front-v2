<template>
  <div id="app">
    <header>
      <nav v-if="loggingIn" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
          <router-link to="/home" class="nav-item nav-link">Mission Control</router-link>
          <router-link to="/customers" class="nav-item nav-link">Register Customer</router-link>
          <router-link to="/showCustomers" class="nav-item nav-link">Show Customers</router-link>
          <router-link v-if="isAdmin" to="/payments" class="nav-item nav-link">Payments</router-link>
          <router-link v-if="isAdmin" to="/admin" class="nav-item nav-link">Admin</router-link>
          <router-link v-if="isAdmin" to="/statistics" class="nav-item nav-link">Statistics</router-link>
          <a @click="logout" class="nav-item nav-link">Logout</a>
          <a class="nav-item nav-link disabled">{{ messageSpaces }}</a>
        </div>
      </nav>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { userService, spaceService } from "../_services/index";
import { router } from "../_helpers/index";
export default {
  name: "app",

  data() {
    return {
      user: "",
      emptySpaces: ""
    };
  },

  mounted() {
    this.findAllEmptySpaces();
  },

  computed: {
    messageSpaces() {
      return (
        this.emptySpaces +
        " free " +
        (this.emptySpaces > 1 ? "spaces" : "space")
      );
    },
    alert() {
      return this.$store.state.alert;
    },

    loggingIn() {
      return this.$store.state.authentication.status.loggedIn;
    },

    isAdmin() {
      return this.$store.state.authentication.status.isAdmin;
    }
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.$store.dispatch("alert/clear");
    }
  },

  methods: {
    findAllEmptySpaces() {
      spaceService.findyByStatus(false).then(response => {
        this.spaces = response;
        this.emptySpaces = this.spaces.length;
      });
    },

    logout() {
      this.$store.dispatch("authentication/logout");
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
