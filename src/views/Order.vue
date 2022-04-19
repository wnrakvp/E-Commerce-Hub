<template>
  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <div class="d-flex justify-content-between align-items-center border-bottom pb-1">
      <h6 class="h6 my-0">Order Management</h6>
      <!-- <button class="btn btn-sm btn-outline-secondary" @click="Logger">
        <i class="bi-plus-circle"></i> Logger
      </button> -->
      <!-- <router-link :to="{ name: 'order-item', params: { id: 'add' } }" custom v-slot="{ navigate }">
        <button class="btn btn-sm btn-outline-secondary" @click="navigate"><i class="bi-plus-circle"></i> Add</button>
      </router-link> -->
    </div>


    <!-- <input type="file" accept="image/*" @change="uploadImage($event)" id="file-input">

    <div id="appImage">
      <div v-if="!image">
        <h2>Choose images to upload (PNG, JPG, JPEG)</h2>
        <input type="file" id="fileImage" name="fileImage" @change="onFileChange" accept="image/.png, .jpe, .jpeg">
       
      </div>
      <div v-else>
        <img :src="image" width="200" height="200"  />
         <button @click="onUpload">Upload!</button>
      </div>
    </div> -->


    <div class="table">
      <table class="table">
        <tr>
          <th class="text-primary">Total({{getCountTotal()}})</th>

          <!-- <th><button class="btn btn-outline-danger" id="READY_TO_SHIP"  @click="selectorderLists('READY_TO_SHIP')"> Rady to ship({{getCountStatus('READY_TO_SHIP')}})</button></th>
          <th><button class="btn btn-outline-warning" id="ON_DELIVERY" @click="selectorderLists('ON_DELIVERY')" > On Delivery({{getCountStatus('ON_DELIVERY')}})</button></th>
          <th><button class="btn btn-outline-info" id="SHIPPED" @click="selectorderLists('SHIPPED')" > Shipped({{getCountStatus('SHIPPED')}})</button></th>
          <th><button class="btn btn-outline-success" id="COMPLETED" @click="selectorderLists('COMPLETED')" > Completed({{getCountStatus('COMPLETED')}})</button></th> -->

          <!-- <th class="text-danger" id="READY_TO_SHIP" >Rady to ship({{getCountStatus('READY_TO_SHIP')}})</th>
          <th class="text-warning" id="ON_DELIVERY" >On Delivery({{getCountStatus('ON_DELIVERY')}})</th>
          <th class="text-info" id="SHIPPED" >Shipped({{getCountStatus('SHIPPED')}})</th>
          <th class="text-success" id="COMPLETED" >Completed({{getCountStatus('COMPLETED')}})</th> -->

          <th class="text-danger">Rady to ship({{getCountStatus('READY_TO_SHIP')}})</th>
          <th class="text-warning">On Delivery({{getCountStatus('ON_DELIVERY')}})</th>
          <th class="text-info">Shipped({{getCountStatus('SHIPPED')}})</th>
          <th class="text-success">Completed({{getCountStatus('COMPLETED')}})</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </table>
    </div>
    <div class="table-responsive">
      <table class="table text-center align-middle">
        <thead>
          <tr>            
            <th scope="col">Marketplace</th>
            <th scope="col">Order No</th>
            <th scope="col">Tracking</th>
            <th scope="col">Status</th>
            <th scope="col">Courier</th>
            <!-- <th scope="col">SKU Name</th> -->
            <!-- <th scope="col">Price</th> -->
            <th scope="col">Item</th>
            <th scope="col">Total</th>
            <th scope="col">Order Date</th>
            <th scope="col">View</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(order, i) in orderList" :key="i">
            <tr>              
              <td>
                <img v-if="order.marketplace === 'shopee'" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAyVBMVEX////2QS7/ZTP+YzP/ZDP3RC79XjL3RS75TS/4Si/6UzD8WjH7VjH5uKj/XiT7OSL/6eP/7uf+ua37tK32AAD8NgD9TxX5Ow/9VSH6QhH6Rxr7PQD4Phn5GQD+VRf2MA37TyX/9/f2OiX7U0H/3dv9xsH8cWD9SAD+7+/9d1v+zcb+4tz/q5b/bDf6fXD9wLr/e1L/s5/6YFP/mn3/pIn/2tD7dGn8w7X/dUb9kIT9raf8pJr8fWf9mIb9i3f8nJH6k5D9bk3/i252H7X1AAAER0lEQVRoge2af3uaMBDHseq6AVNXGiuEH9GqoG6w2nWd0OrW9/+iFqC1SALxaLZnzzO/f2kCfAy5XO5yKspJJ530v+tTjQb1Og6w+vzFfdawLPNQV0V5uZAXRiLE4Kvb67RzvStIy6XnUnO9f9GHTOeput1J3zNqGTd+h6rNUgCQbqvlrcfVjFv37EwGpDWZBFWMb5QhB0IpFYy7lCEJ0pp850N6ZxIhLW/JY9wfAVEtjDBCJhFDWtc8yI8zIQQtjHS1BcsNtoQQb8Uyxq4IgsOCycSYCCD9mIUsewIIvju8YW3WQ3hTfy+AkJf1Fbx82OBaCG9SPtZD/PyqREVU22n2ZWvXQvpQCMqmI0IkM2GCHrJ7rqVC3MzlPeL9OiHZih4jmRAte1V+YTGS86zJlgfx09W7QgcrnmzTu67kQaz0Ar3kVpx0se2ILMhoR/vv/BKEpOsgQLIgfmqxT6TsIJ30NmkjwWk/YrywOaPNWyJrTmj3ADMQ8pO2x/Ye0gVCOj2q0bOGC9q9xEOrJDNdkTNkFzQBQDrti6IyAy42GLnS2CeIjVdF3yfHQ9x7tv84OQCIMD6TAOldNIVcnv95yBgCuWkICRwA5HNDyAACeWwImUIgt5U/NUqSm4gT7DxDEGAxPvGfYRBkEUIs5ITc+FCZeQDIA+8JY93UdQtjTANIggkPc2EDIAseg7pI/BCtPq2inY6IijbsNXEfAPnFgag09tpPxiBEDicFSSCQNtt/72tmMX+a8nK2HQTSY/sX2kjs0TYAL9z22X6kYSEDBkENISEEwnke1nBlsrnXHPS62BT5gRCxs1l3IRD2Ry/pUIQz/1aIsiAaFo2lC4lWfJ4LvB5pBCc1Zw2KYoNGcsdeQAM5pGuEJqfVEAcyEpfvZKe/aBakWmhb5esvQZCqKR480iSeZlpzrjmPYZCawGsWIkslTsLpCkCvq/exGkIV09GYc7Z9AIOIIoktVq2QaV3JhSgxVhFjglMEguxEkNTNMC9s5oEgYjcVIJXx1dEVKD+pCFeKwnk+V5TRlw0xWUgMg/DClZIc1S437WAQNlwhJVeSEMLY8E8Y5F25eztCBxa3pPM+LV+0geSMnEiCEG1kvZ7F7ZBK2DAzfCOE+nlNG6FFEk2XcUgDyPwE51BzGIQTSUw1THSdWDQUJqqKOK5LWb8ZQjGPJjJpWG9hZ8HdcNag7ZcXrmQKlkayu+BvaXSDBkLEMRZHV38Dcgk7wOGGK7Ih7qwBg+6+IMgxHpJRYosgpRNu/8g6W0FjR3jCXT6rd2tDRZ5a4rP6ctWh4xsQCwsMVDq541UdlC+HkHZ75GPEymF0mcqxmfoJ46SV/cwfX27SG1SC/kpNS3J1juelU9325EH6lcb5JK1i6tVY5jc5td/+da31r368VrEbQiZ9xEsrDqf/tjesqscPa+rxLxV5Z15fKN9L8O+BOjXah0466d/Wb+PLuQqaR2/wAAAAAElFTkSuQmCC" alt="shopee" width="24" height="24">
                <img v-if="order.marketplace === 'lazada'" src="data:image/jpeg;base64,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" alt="lazada" width="24" height="24">
                {{order.marketplace}}
              </td>
              <td>{{order.orderNo}}</td>
              <td>{{order.trackNo}}</td>
              <td>{{getTextStatus(order.orderStatus)}}</td>
              <td>{{order.courier}}</td>
              <td>{{getCountItems(i)}}</td>
              <td>{{getTotal(i).toLocaleString()}}</td>
              <td>{{formatDate(order.date)}}</td>
              
              <td>
                <router-link :to="{ name: 'order-item', params: { id: order.id } }" custom v-slot="{ navigate }">
                  <button class="btn btn-sm btn-outline-secondary" @click="navigate"><i class="bi-three-dots"></i></button>
                </router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <router-view></router-view>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
  },
  mounted () {
    this.getAll().then(o => {
      console.debug(o)
      this.date = this.formatDate(o.date)
      this.marketplace = o.marketplace
      this.orderNo = o.orderNo
      this.trackNo = o.trackNo
      this.orderStatus = o.orderStatus
      this.deliveryBy = o.deliveryBy
      this.courier = o.courier
    }).catch(console.error)
  },
  computed: {
    ...mapGetters('Order', {
      orderList: 'all'
    })
  },
  // orderLists (statevalue) {
  //   console.log('*** orderLists: '+ statevalue)

  //   if (statevalue === 'READY_TO_SHIP')
  //     return this.orderList.filter(x => x.orderStatus.has('READY_TO_SHIP'))
  //   else if (statevalue === 'ON_DELIVERY')
  //     return this.orderList.filter(x => x.orderStatus.has('ON_DELIVERY'))
  //   else if (statevalue === 'SHIPPED')
  //     return this.orderList.filter(x => x.orderStatus.has('SHIPPED'))
  //   else if (statevalue === 'COMPLETED')
  //     return this.orderList.filter(x => x.orderStatus.has('COMPLETED'))
  //   else return this.orderList

  //   },
  el: '#appImage',
  data () {
    return {
      date: new Date(),
      orderNo: '',
      trackNo: '',
      orderStatus: '',
      deliveryBy: '',
      courier: '',
      marketplace: '',
      skuList: [],
      image: '',
      fileImage: '',
    }
  },
  methods: {
    ...mapActions('Order', {
      getAll: 'getAll'
    }),
    onFileChange(e) {
      let formData = new FormData();
      console.log('>> formData >> ', formData);

      console.log(e)
      var files = e.target.files || e.dataTransfer.files;
      console.log('e: '+e)
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    onUpload() {
      //const formData = new FormData()
      formData.append('myFile', this.selectedFile, this.selectedFile.name)
      console.log('>> formData >> ', formData);
      // axios.post('http://localhost:5000/api/v1/file-upload', formData)
     
    },
    removeImage: function (e) {
      this.image = '';
    },
    uploadImage(event) {

      console.log('event: '+ event)
      const URL = 'http://localhost:5000/FileUpload'; 
      console.log('URL: '+ URL)

      let data = new FormData();
      data.append('name', 'my-picture');
      data.append('file', event.target.files[0]); 

      console.log('data: '+ data)

      let config = {
        header : {
          'Content-Type' : 'image/png'
        }
      }

      axios.put(
        URL, 
        data,
        config
      ).then(
        response => {
          console.log('image upload response > ', response)
        }
      )
    },
    formatDate(date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [day, month, year].join('-')
    },
    getTextStatus(orderStatus){
      var textStatus = ""
      if (orderStatus == 'READY_TO_SHIP'){
        textStatus= 'Ready to ship'
      } else if (orderStatus == 'ON_DELIVERY') {
        textStatus= 'On delivery'
      } else if (orderStatus == 'SHIPPED') {
        textStatus= 'Shipped'
      } else if (orderStatus == 'COMPLETED') {
        textStatus= 'Completed'
      } 
      return textStatus
    },
    getTotal(i){
        var total = 0
        var items = this.orderList[i].items
        for(let j = 0;j < items.length; j++ ) {
           total = total+items[j].price       
        }
      return  total
     },
    getCountItems(i){
        var CountItems = 0
        var items = this.orderList[i].items
        // console.log('item: '+items)
        for(let j = 0;j < items.length; j++ ) {
           CountItems +=1   
        }
      return  CountItems
     },
     getCountTotal(){
       var count=this.orderList.length
       return count
     }, 
     getCountStatus(statevalue) {
       var count=0
       for(let i = 0; i < this.orderList.length; i++){
          if (this.orderList[i].orderStatus === statevalue){
           count = count+1
          } 
        }
       return count
     },         
     selectorderLists(statevalue) {
        var textStatus = ""
        if (statevalue == 'READY_TO_SHIP'){
          console.log('Ready to Ship: '+ statevalue)
        } else if (statevalue == 'ON_DELIVERY') {
          console.log('On delivery: '+ statevalue)
        } else if (statevalue == 'SHIPPED') {
          console.log('shipped: '+ statevalue)
        } else if (statevalue == 'COMPLETED') {
          console.log('completed: '+ statevalue)
        } 
        return textStatus
     },
     orderLists (statevalue) {
    console.log('*** orderLists: '+ statevalue)

    if (statevalue === 'READY_TO_SHIP')
      return this.orderList.filter(x => x.orderStatus.has('READY_TO_SHIP'))
    else if (statevalue === 'ON_DELIVERY')
      return this.orderList.filter(x => x.orderStatus.has('ON_DELIVERY'))
    else if (statevalue === 'SHIPPED')
      return this.orderList.filter(x => x.orderStatus.has('SHIPPED'))
    else if (statevalue === 'COMPLETED')
      return this.orderList.filter(x => x.orderStatus.has('COMPLETED'))
    else return this.orderList
    
    },
     Logger() {
      console.log('price'+this.orderList[0].items[0].price);
      console.log('amount'+this.orderList[0].items[0].amount);
      var total = 0
        //var items = this.orderList[0].items
        console.log(i)

        console.log('item: '+this.items.orderList)

        for(let i = 0; i < this.orderList.length; i++){
          item = this.orderList[i].item;

          for(let j = 0;j < item.length; j++ ) {
            
               
          }
        }


        
    }
  }
}
</script>