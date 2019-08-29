<template>
  <div id="app">
    <main>
      <div class="container-fluid">
        <div class="container">
          <div class="formBox">
              <div class="row">
                <div class="col-sm-12">
                  <h1>Mission Control</h1>
                </div>
              </div>
              <div class="alert alert-info">
                <p>
                  First, type the vehicle plate and press "check in"
                  or check out a vehicle searching for it
                </p>
                <div class="input-group mb-3">
                  <input
                    name="search"
                    type="text"
                    class="form-control"
                    placeholder="Search for plate"
                    v-model="checkInOut.plate"
                    :disabled="searched"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-success"
                      type="button"
                      @click="findByPlate()"
                    >Start</button>
                    <button
                      class="btn btn-danger"
                      type="button"
                      @click="restart()"
                    >Restart</button>
                  </div>
                </div>
                <div class="form-group" v-if="!found">
                  <div class="form-row align-items-center">
                    <div class="col-auto my-1">
                      <label for="space" class="mr-sm-2">Space</label>
                      <select
                        v-model="checkInOut.spaceId"
                        class="custom-select mr-sm-2"
                        :required="true"
                      >
                        <option value disabled>Select a space</option>
                        <option v-for="space in spaces" :key="space.id">{{ space.id }}</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="form-group" v-if="!checkInOut.status">
                  <button class="btn btn-primary" :disabled="loading" @click="checkIn()">
                    <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                    <span>Check in</span>
                  </button>
                  <button
                    class="btn btn-primary"
                    :disabled="loading"
                    @click="checkOut()"
                    v-if="isCheckedIn"
                  >
                    <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                    <span>Check out</span>
                  </button>
                  <button
                    class="btn btn-primary"
                    :disabled="loading"
                    @click="registerPayment()"
                    v-if="isCheckedOut && !checkInOut.status"
                  >
                    <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                    <span>Pay</span>
                  </button>
                </div>
              </div>

              <div class="alert alert-info" :class="{ 'alert alert-danger': !checkInOut.status  }">
                <div class="form-group" v-if="found">
                  <h3>{{ message }}</h3>

                  <h3>{{ checkInOut.plate }}</h3>

                  <label for="checkIn">Check in date</label>
                  <h4>{{ checkInOut.checkInDate }}</h4>

                  <label for="checkIn">Check in hour</label>
                  <h4>{{ checkInOut.checkInHour }}</h4>

                  <label for="checkOut">Check out hour</label>
                  <h4>{{ checkInOut.checkOutHour }}</h4>

                  <label for="totalHours">Total hours</label>
                  <h4>{{ checkInOut.totalHours }}</h4>

                  <label for="Name">Value</label>
                  <h4>{{ checkInOut.value }}</h4>

                  <label for="Name">Space</label>
                  <h4>{{ checkInOut.spaceId }}</h4>
                </div>
                <div class="form-group" v-else>
                  <h4>{{ message }}</h4>
                </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { spaceService, singleCarService } from "../_services/index";
import { Role } from "../_helpers";

export default {
  data() {
    return {
      checkInOut: {
        id: "",
        checkInDate: "",
        checkInHour: "",
        checkOutHour: "",
        totalHours: "",
        plate: "",
        value: "",
        spaceId: "",
        status: false
      },
      spaces: [],
      message: "Nothing to show yet",
      found: false,
      loading: false,
      searched: false
    };
  },
  created() {
    this.findySpacesByStatus();
    //this.checkAdmin();
  },

  computed: {
    isCheckedIn() {
      return this.checkInOut.checkInHour;
    },
    isCheckedOut() {
      return this.checkInOut.checkOutHour;
    }
  },

  methods: {
    findByPlate() {
      if (this.validatePlateField() === true) {
        singleCarService.findByPlate(this.checkInOut.plate).then(response => {
          if (response === false) {
            this.setMessage("Please, select a space and check in");
          } else {
            this.CheckInOut = this.parseModel(response);
            this.setMessage("Check it out");
            this.found = true;
          }
        });
        this.searched = true;
      }
    },

    findySpacesByStatus() {
      spaceService.findyByStatus(false).then(response => {
        this.spaces = response;
      });
    },

    checkIn() {
      if (this.validatePlateField() === true) {
        if (this.validateSpaceField() === true) {
          singleCarService.checkIn(this.checkInOut).then(response => {
            if (response !== false) {
              this.CheckInOut = this.parseModel(response);
              this.found = true;
              this.setMessage("Vehicle checked in");
            } else {
              this.setMessage("Something went wrong checking in!");
            }
          });
        }
      }
    },

    checkOut() {
      singleCarService.checkOut(this.checkInOut).then(response => {
        if (response !== false) {
          this.CheckInOut = this.parseModel(response);
          this.setMessage("Vehicle checked out, value to pay is shown below");
        } else {
          this.setMessage("Something went wrong checking out!");
        }
      });
    },

    registerPayment() {
      singleCarService.registerPayment(this.checkInOut).then(response => {
        if (response !== false) {
          this.CheckInOut = this.parseModel(response);
          this.setMessage("Payment has been received :)");
        } else {
          this.setMessage("Please, check out first");
        }
      });
    },

    validatePlateField() {
      if (this.checkInOut.plate === "") {
        this.setMessage("Please, type a plate and click 'Start' ");
        return false;
      }
      return true;
    },

    validateSpaceField() {
      var reg = new RegExp("^[0-9]+$");
      if (this.checkInOut.spaceId.match(reg)) {
        return true;
      }
      this.setMessage("Please, select a space");
      return false;
    },

    restart() {
      location.reload();
    },

    parseModel(model) {
      this.checkInOut.id = model.id;
      this.checkInOut.checkInDate = model.checkInDate;
      this.checkInOut.checkInHour = model.checkInHour;
      this.checkInOut.checkOutHour = model.checkOutHour;
      this.checkInOut.totalHours = model.totalHours;
      this.checkInOut.plate = model.plate;
      this.checkInOut.value = model.value;
      this.checkInOut.spaceId = model.spaceId;
      this.checkInOut.status = model.status;
    },

    setMessage(msg) {
      this.message = msg;
    },

    checkAdmin() {
      var userRole = localStorage.getItem("userData");
      if (userRole.includes(Role.Admin)) {
        this.$store.dispatch("authentication/checkAdmin");
      }
    }
  }
};
</script>