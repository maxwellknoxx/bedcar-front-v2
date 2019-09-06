<template>
  <div id="app">
    <main>
      <div class="container">
        <div class="formBox">
          <div class="row">
            <div class="col-sm-12">
              <h1>Statistics</h1>
              <br />
              <h4>{{ messageTotal }}</h4>
              <div class="alert alert-info">
                <div id="monthly">
                  <h4>monthly</h4>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Vehicles</th>
                        <th>Money</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ messageMonthlyVehicles }}</td>
                        <td>{{ messagePaymentsMonthly }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div id="biWeekly">
                  <h4>Bi-Weekly</h4>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Vehicles</th>
                        <th>Money</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ messageBiweeklyVehicles }}</td>
                        <td>{{ messagePaymentsBiweekly }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div id="singleCar">
                  <h4>Single Car</h4>
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Vehicles</th>
                        <th>Money</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ messageSingleVehicles }}</td>
                        <td>{{ messagePaymentsSingleVehicles }}</td>
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
import { vehicleService } from "../_services";
import { paymentService } from "../_services";
import { singleCarService } from "../_services";

export default {
  data() {
    return {
      monthlyCars: "",
      biweeklyCars: "",
      singleCars: "",
      totalPaymentsMonthly: "",
      totalPaymentsBiweekly: "",
      totalPaymentsSingleCar: "",
      totalMoney: ""
    };
  },

  created() {
    this.countVehiclesByPlan();
    this.countPaymentsByPlan();
    this.countSingleCars();
    this.getPaidValues();
  },

  computed: {
    messageMonthlyVehicles() {
      return (
        "You have " +
        this.monthlyCars +
        " monthly " +
        (this.monthlyCars > 1 ? "vehicles" : "vehicle")
      );
    },
    messagePaymentsMonthly() {
      return "You have earned €" + this.totalPaymentsMonthly;
    },
    messageBiweeklyVehicles() {
      return (
        "You have " +
        this.monthlyCars +
        " biweekly " +
        (this.monthlyCars > 1 ? "vehicles" : "vehicle")
      );
    },
    messagePaymentsBiweekly() {
      return "You have earned €" + this.totalPaymentsBiweekly;
    },
    messageSingleVehicles() {
      return (
        "You had " +
        this.singleCars +
        " single " +
        (this.singleCars > 1 ? "vehicles" : "vehicle")
      );
    },
    messagePaymentsSingleVehicles() {
      return "You have earned €" + this.totalPaymentsSingleCar;
    },
    messageTotal() {
      let total =
        this.totalPaymentsMonthly +
        this.totalPaymentsBiweekly +
        this.totalPaymentsSingleCar;
      return "Cash earned €" + total;
    }
  },

  methods: {
    countVehiclesByPlan() {
      vehicleService.countByPlan("Monthly").then(response => {
        this.monthlyCars = response;
      });
      vehicleService.countByPlan("BiWeekly").then(response => {
        this.biweeklyCars = response;
      });
    },

    countPaymentsByPlan() {
      paymentService.countByPaidValue("140").then(response => {
        this.totalPaymentsMonthly = response;
      });
      paymentService.countByPaidValue("80").then(response => {
        this.totalPaymentsBiweekly = response;
      });
    },

    countSingleCars() {
      singleCarService.count().then(response => {
        this.singleCars = response;
      });
    },

    getPaidValues() {
      singleCarService.getPaidValues().then(response => {
        this.totalPaymentsSingleCar = response;
      });
    }
  }
};
</script>
