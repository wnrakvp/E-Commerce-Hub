<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div
      class="d-flex justify-content-between align-items-center border-bottom pb-1"
    >
      <h6 class="h6 my-0">Track Shipment</h6>
      <form class="row g-3">
        <div class="col-auto">
          <label for="inputOrderNo" class="visually-hidden">Tracking No.</label>
          <input
            type="text"
            class="form-control"
            id="inputOrderNo"
            placeholder="Tracking No."
            v-model="trackingno"
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3" v-on:click="getStatus(trackingno)">
            Check
          </button>
        </div>
      </form>
    </div>
    <p>{{data}}</p> 
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      trackingno: null,
      data: null,
    };
  },
  mounted() {
    // axios
    //   .get('http://localhost:5000/items')
    //   .then((response) => (this.data = response.data));
  },
  computed: {
    ...mapGetters('Order', {
      orderList: 'all'
    })
  },
  methods: {
    ...mapActions('Order', {
      getAll: 'getAll'
    }),
    getStatus(trackingno) {
      if (!trackingno) {
        alert('Please Input Tracking No.');
      } else {
        alert('get status from Tracking No. ' + trackingno);
      }
    }
  }
};
</script>
