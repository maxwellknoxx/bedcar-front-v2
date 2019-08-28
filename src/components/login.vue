<template>
  <div id="app">
    <div class="login-form">
      <form @submit.prevent="login">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            required="required"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            required="required"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">Log in</button>
        </div>
        <div class="clearfix">
          <router-link to="/signup">Sign Up</router-link>
        </div>
        <div class="clearfix">
          <span class="pull-right">
            <router-link to="/forgotPassword">Forgot Password?</router-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
      message: ""
    };
  },

  computed: {
    loggingIn() {
      return this.$store.state.authentication.status.loggingIn;
    }
  },

  created() {
    // reset login status
    this.$store.dispatch("authentication/logout");
  },

  methods: {
    login() {
      this.submitted = true;
      const { username, password } = this;
      const { dispatch } = this.$store;
      if (username && password) {
        dispatch("authentication/login", { username, password }).then(res => {
          localStorage.setItem("isLogged", true);
        });
      }
    },

    cleanMessage() {
      this.setMessage("");
    },

    setMessage(msg) {
      this.$log.info("Login", msg);
      this.message = msg;
    },

    validateUserField() {
      if (!this.username.match("^[a-zA-Z0-9]*$")) {
        this.showMessage("Please, no space allowed");
        this.username = "";
      }
    }
  }
};
</script>


<style>
.login-form {
  width: 340px;
  margin: 50px auto;
}
.login-form form {
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
}
</style>
