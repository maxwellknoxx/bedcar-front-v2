<template>
  <div id="app">
    <header>
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
                    v-model="payment.plate"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="findVehicleByPlate()"
                    >Search</button>
                  </div>
                </div>
                <button
                  class="btn btn-success"
                  type="button"
                  @click="registerPayment()"
                  v-if="found && !paid"
                >Register Payment</button>
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
              <div class="alert alert-info">
                <div class="form-group">
                  <h4>{{ vehicle.ownerName }}</h4>
                  <h4>{{ vehicle.plate }}</h4>
                  <h4>{{ vehicle.plan }}</h4>
                </div>
                <div class="input-group mb-3">
                  <table class="table">
                    <thead>
                      <tr v-if="found && paymentsFound">
                        <th scope="col">Paid value</th>
                        <th scope="col">Payment date</th>
                      </tr>
                      <tr v-else-if="!paymentsFound">
                        <th scope="col">All payments</th>
                      </tr>
                      <tr v-else>
                        <th scope="col">Owner</th>
                        <th scope="col">Plate</th>
                        <th scope="col">Paid value</th>
                        <th scope="col">Payment date</th>
                      </tr>
                    </thead>
                    <tbody v-if="found && paymentsFound">
                      <tr v-for="payment in payments" :key="payment.id">
                        <td>{{ payment.paidValue }}</td>
                        <td>{{ payment.paymentDate }}</td>
                      </tr>
                    </tbody>
                    <tbody v-else-if="!paymentsFound && found">
                      <h4>No payments yet</h4>
                    </tbody>
                    <tbody v-else>
                      <tr v-for="payment in payments" :key="payment.id">
                        <td>{{ payment.ownerName }}</td>
                        <td>{{ payment.plate }}</td>
                        <td>€{{ payment.paidValue }}</td>
                        <td>{{ payment.paymentDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { paymentService } from "@/_services";

import { vehicleService } from "@/_services";
export default {
  data() {
    return {
      payment: {
        vehicle: {
          id: "",
          plate: ""
        },
        paymentDate: "",
        paidValue: ""
      },
      paymentModel: {
        id: "",
        ownerName: "",
        vehicleId: "",
        plate: "",
        paymentDate: "",
        plan: "",
        paidValue: ""
      },
      vehicle: {
        id: "",
        plate: "",
        ownerName: "",
        plan: "",
        ownerAddress: ""
      },
      payments: [],
      paymentsFound: false,
      found: false,
      paid: false
    };
  },

  created() {
    this.findAllPayments();
  },

  methods: {
    findAllPayments() {
      paymentService.findAll().then(response => {
        this.payments = response;
      });
    },

    findPaymentByVehiclePlate() {
      paymentService
        .findPaymentByVehiclePlate(this.payment.plate)
        .then(response => {
          if (this.validatePaymentResponse(response)) {
            this.payments = response;
          }
        });
    },

    validatePaymentResponse(response) {
      if (!response) {
        this.payments = [];
        return false;
      } else {
        this.found = true;
        this.paymentsFound = true;
        return true;
      }
    },

    findVehicleByPlate() {
      this.resetBooleans();
      if (this.validateField()) {
        vehicleService.findVehicleByPlate(this.payment.plate).then(response => {
          if (this.validateVehicleResponse(response)) {
            this.vehicle = response;
            this.findPaymentByVehiclePlate(this.payment.plate);
          }
        });
      }
    },

    validateVehicleResponse(response) {
      if (!response) {
        alert("This Vehicle " + this.payment.plate + " is not registered");
        return false;
      } else {
        this.found = true;
        return true;
      }
    },

    registerPayment() {
      this.parseVehicleToPayment();
      paymentService.registerPayment(this.payment).then(response => {
        this.payments = response;
        this.paid = true;
        this.paymentsFound = true;
      });
    },

    resetBooleans() {
      this.found = false;
      this.paymentsFound = false;
      this.paid = false;
    },

    parsePlanToValue() {
      if (this.vehicle.plan.includes("BiWeekly")) {
        return "80";
      }
      return "140";
    },

    parseVehicleToPayment() {
      this.payment.vehicle.plate = this.vehicle.plate;
      this.payment.vehicle.id = this.vehicle.id;
      this.payment.paidValue = this.parsePlanToValue();
    },

    validateField() {
      if (this.payment.plate) {
        return true;
      } else {
        alert("Please, what is the vehicle's plate?");
      }
    }
  }
};
</script>