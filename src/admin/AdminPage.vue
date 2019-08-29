<template>
  <div id="app">
    <div class="container">
      <div class="formBox">
        <div class="row">
          <div class="col-sm-12">
            <div class="alert alert-info">
              <header>
                <h1>Admin</h1>
                <p>Add new users or edite the existing ones.</p>
              </header>
            </div>
            <main>
              <div class="alert alert-info">
                <form @submit.prevent="create">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      v-model="user.name"
                      name="name"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input
                      type="text"
                      v-model="user.username"
                      name="username"
                      class="form-control"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      v-model="user.password"
                      name="password"
                      class="form-control"
                      required
                      :disabled="isEditing && !updatePassword"
                    />
                    <div class="custom-control custom-checkbox" v-if="isEditing">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="updatePassword"
                        v-model="updatePassword"
                      />
                      <label class="custom-control-label" for="updatePassword">Update password</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="form-row align-items-center">
                      <div class="col-auto my-1">
                        <label class="mr-sm-2" for="inlineFormCustomSelect">Role</label>
                        <select
                          v-model="user.role.id"
                          name="role"
                          class="custom-select mr-sm-2"
                          id="inlineFormCustomSelect"
                        >
                          <option value disabled>Choose a role</option>
                          <option value="1">ROLE_ADMIN</option>
                          <option value="2">ROLE_USER</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary" :disabled="loading" v-if="!isEditing">
                      <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                      <span>Create user</span>
                    </button>
                    <button class="btn btn-success" :disabled="loading" v-else>
                      <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                      <span>Update user</span>
                    </button>
                  </div>
                </form>
              </div>
            </main>
            <hr />
            <div class="alert alert-info">
              <table class="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Options</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="userFromDB in users" :key="userFromDB.id">
                    <td>{{ userFromDB.name }}</td>
                    <td>{{ userFromDB.username }}</td>
                    <td>{{ userFromDB.role }}</td>
                    <td>
                      <button class="btn btn-primary" @click="edit(userFromDB)" v-if="!isEditing">
                        <span>Edit</span>
                      </button>
                      <button class="btn btn-primary" @click="cancel()" v-else>
                        <span>Cancel</span>
                      </button>
                    </td>
                    <td>
                      <button class="btn btn-danger" @click="deleteUser(userFromDB)">
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userService } from "@/_services";

export default {
  data() {
    return {
      user: {
        id: "",
        name: "",
        username: "",
        password: "",
        role: {
          id: "",
          name: ""
        }
      },
      userModel: {
        id: "",
        name: "",
        username: "",
        role: ""
      },
      users: [],
      loading: false,
      isEditing: false,
      updatePassword: false
    };
  },
  created() {
    this.findAll();
  },

  methods: {
    create() {
      if (!this.isEditing) {
        userService.create(this.user).then(response => {
          this.validateResponse(response);
        });
      } else {
        //this.updateUser(this.user);
        this.$log.info(this.user);
      }
      this.text = "";
    },

    updateUser(userInformation) {
      userService.update(userInformation).then(response => {
        this.validateResponse(response);
        this.isEditing = false;
      });
    },

    findAll() {
      userService.findAll().then(response => {
        this.users = response;
      });
    },

    deleteUser(user) {
      if (confirm("Would you like to delete this user?")) {
        userService.deleteUser(user.id).then(response => {
          if (response === true) {
            alert("User has been removed");
            this.findAll();
            this.clean();
          } else {
            alert("Something went wrong");
            this.cancel();
          }
        });
      }
    },

    validateResponse(response) {
      if (response === true) {
        this.users = this.findAll();
      } else {
        alert("Please, verify the typed information and try again");
      }
    },

    edit(userFromDB) {
      this.parseModel(userFromDB);
      this.isEditing = true;
    },

    cancel() {
      this.clean();
      this.isEditing = false;
    },

    clean() {
      this.user.id = "";
      this.user.name = "";
      this.user.username = "";
      this.user.role.id = "";
      this.user.role.name = "";
    },

    parseModel(userFromDB) {
      this.user.id = userFromDB.id;
      this.user.name = userFromDB.name;
      this.user.username = userFromDB.username;
      this.user.role.id = this.parseRole(userFromDB.role);
      this.user.role.name = this.parseRoleName(this.user.role.id);
    },

    parseRole(role) {
      if (role === "ROLE_ADMIN") {
        return 1;
      }
      return 2;
    },

    parseRoleName(id) {
      if (id === "1") {
        return "ROLE_ADMIN";
      }
      return "ROLE_USER";
    }
  }
};
</script>