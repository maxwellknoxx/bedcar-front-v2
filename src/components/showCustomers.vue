<template>
  <div id="app">
    <header>
      <h4>Customer</h4>
    </header>
    <main>
      
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Plate</th>
              <th scope="col">Owner</th>
              <th scope="col">Document</th>
              <th scope="col">Adress</th>
              <th scope="col">Plan</th>
              <th scope="col">Subscription date</th>
              <th scope="col">Due date</th>
              <th scope="col">Space</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.plate }}</td>
              <td>{{ customer.ownerName }}</td>
              <td>{{ customer.ownerDocumentNumber }}</td>
              <td>{{ customer.ownerAddress }}</td>
              <td>{{ customer.plan }}</td>
              <td>{{ customer.subscriptionDate }}</td>
              <td>{{ customer.dueDate }}</td>
              <td>{{ customer.spaceId }}</td>
            </tr>
          </tbody>
        </table>
    </main>
  </div>
</template>

<script>
import { vehicleService } from "@/_services";

export default {
  data() {
    return {
      customers: []
    };
  },

  created() {
    this.findAll();
  },

  methods: {
    findAll() {
      vehicleService.findAll().then(response => {
        this.customers = response;
      });
    }
  }
};
</script>