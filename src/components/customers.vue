<template>
  <div id="app">
    <header>
      <h4>{{ message }}</h4>

      <div class="container">
        <div class="formBox">
          <div class="row">
            <div class="col-sm-12">
              <div class="alert alert-info">
                Search for a plate to bring customer's information
                <div class="input-group mb-3">
                  <input
                    name="search"
                    type="text"
                    class="form-control"
                    placeholder="Search for plate"
                    v-model="plate"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="findVehicleByPlate(plate)"
                    >Search</button>
                  </div>
                </div>
                <div class="input-group mb-3">
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="deleteById(vehicle.id)"
                      v-if="vehicleFound"
                    >Delete register</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <div class="formBox">
          <div class="row">
            <div class="col-sm-12">
              <h2>Vehicle</h2>
              <div class="alert alert-info" v-if="!allCustomers">
                <form @submit.prevent="register">
                  <div class="form-group">
                    <label for="plate">Plate</label>
                    <input
                      type="text"
                      v-model="vehicle.plate"
                      name="plate"
                      class="form-control"
                      :disabled="vehicleFound"
                    />
                  </div>
                  <h4>Owner</h4>
                  <div class="form-group">
                    <label for="Name">Full Name</label>
                    <input type="text" v-model="vehicle.ownerName" name="name" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="documentNumber">Document number</label>
                    <input
                      type="text"
                      v-model="vehicle.ownerDocumentNumber"
                      name="documentNumber"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="adress">Address</label>
                    <input
                      type="text"
                      v-model="vehicle.ownerAddress"
                      name="address"
                      class="form-control"
                    />
                  </div>
                  <hr />
                  <div class="form-group">
                    <div class="form-row align-items-center">
                      <div class="col-auto my-1">
                        <label class="mr-sm-2" for="plan">plan</label>
                        <select
                          v-model="vehicle.plan"
                          name="plan"
                          class="custom-select mr-sm-2"
                          id="plan"
                        >
                          <option value disabled>Select a plan</option>
                          <option>BiWeekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                    </div>

                    <div class="form-row align-items-center">
                      <div class="col-auto my-1">
                        <label class="mr-sm-2" for="space">Space</label>
                        <select
                          v-model="vehicle.space.id"
                          v-if="!vehicleFound"
                          class="custom-select mr-sm-2"
                          id="space1"
                        >
                          <option value disabled>Select a space</option>
                          <option v-for="space in spaces" :key="space.id">{{ space.id }}</option>
                        </select>

                        <select
                          v-model="vehicle.space.id"
                          v-else
                          class="custom-select mr-sm-2"
                          id="space2"
                        >
                          <option value disabled>Select a space</option>
                          <option selected>{{ vehicle.space.id }}</option>
                          <option v-for="space in spaces" :key="space.id">{{ space.id }}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <button class="btn btn-primary" :disabled="loading" v-if="!vehicleFound">
                      <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                      <span>Register</span>
                    </button>

                    <button class="btn btn-primary" :disabled="loading" v-else>
                      <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                      <span>Update</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script>
import { router } from "@/_helpers";

import { spaceService } from "@/_services";
import { vehicleService } from "@/_services";

export default {
  data() {
    return {
      vehicle: {
        id: "",
        plate: "",
        ownerName: "",
        ownerDocumentNumber: "",
        ownerAddress: "",
        plan: "",
        subscriptionDate: "",
        dueDate: "",
        space: {
          id: ""
        }
      },
      message: "",
      plate: "",
      vehicles: [],
      spaces: [],
      returnUrl: "",
      loading: false,
      vehicleFound: false,
      allCustomers: false
    };
  },

  created() {
    this.findySpacesByStatus();
  },

  methods: {
    register() {
      if (!this.vehicleFound) {
        vehicleService.register(this.vehicle).then(response => {
          if (response === true) {
            this.setMessage(
              "Vehicle " + this.vehicle.plate + " has been registered!"
            );
          } else {
            this.setMessage(
              "Vehicle " + this.vehicle.plate + " coudl not be inserted"
            );
          }
        });
      } else {
        vehicleService.update(this.vehicle).then(response => {
          if (response === true) {
            this.setMessage(
              "Vehicle " + this.vehicle.plate + " has been updated!"
            );
          } else {
            this.setMessage(
              "Vehicle " + this.vehicle.plate + " coudl not be updated"
            );
          }
        });
      }
      this.vehicleFound = false;
    },

    findySpacesByStatus() {
      spaceService.findyByStatus(false).then(response => {
        this.spaces = response;
      });
    },

    findVehicleByPlate() {
      vehicleService.findVehicleByPlate(this.plate).then(response => {
        if (response !== false) {
          this.vehicleFound = true;
          this.parseVehicle(response);
        } else {
          this.setMessage("Plate " + this.plate + " has not been found");
        }
      });
    },

    deleteById(id) {
      vehicleService.deleteById(id).then(response => {
        this.setMessage("Vehicle removed");
        location.reload();
      });
    },

    setMessage(messageToSet) {
      alert(messageToSet);
      this.cleanFields();
    },

    parseVehicle(vehicleModel) {
      this.vehicle.id = vehicleModel.id;
      this.vehicle.plate = vehicleModel.plate;
      this.vehicle.ownerName = vehicleModel.ownerName;
      this.vehicle.ownerDocumentNumber = vehicleModel.ownerDocumentNumber;
      this.vehicle.ownerAddress = vehicleModel.ownerAddress;
      this.vehicle.plan = vehicleModel.plan;
      this.vehicle.subscriptionDate = vehicleModel.subscriptionDate;
      this.vehicle.dueDate = vehicleModel.dueDate;
      this.vehicle.space.id = vehicleModel.spaceId;
    },

    cleanFields() {
      this.plate = "";
      this.vehicle.id = "";
      this.vehicle.plate = "";
      this.vehicle.ownerName = "";
      this.vehicle.ownerDocumentNumber = "";
      this.vehicle.ownerAddress = "";
      this.vehicle.plan = "";
      this.vehicle.subscriptionDate = "";
      this.vehicle.dueDate = "";
      this.vehicle.space.id = "";
    }
  }
};
</script>