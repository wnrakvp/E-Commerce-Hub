<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="OrderItem" aria-labelledby="OrderItemLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="OrderItemLabel">{{id==='add'?'Add':''}} Order Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>

<!-- <button class="btn btn-sm btn-outline-secondary" @click="Logger">
        <i class="bi-plus-circle"></i> Logger
      </button>  -->

  <div class="offcanvas-body">
    <form @submit.prevent="submit">
      <fieldset>        
        <div class="mb-1">
          <div v-if="orderStatus === 'READY_TO_SHIP' || orderStatus === 'ready_to_ship'">
            <p class="badge bg-danger">{{ getStatus(orderStatus) }}</p>
          </div>
          <div v-else-if="orderStatus === 'ON_DELIVERY' || orderStatus === 'on_delivery'">
            <p class="badge bg-warning">{{ getStatus(orderStatus) }}</p>
          </div>
          <div v-else-if="orderStatus === 'SHIPPED' || orderStatus.toLowerCase() === 'shipped'">
            <p class="badge bg-info">{{ getStatus(orderStatus) }}</p>
          </div>
          <div v-else-if="orderStatus === 'COMPLETED' || orderStatus.toLowerCase() === 'completed'">
            <p class="badge bg-success">{{ getStatus(orderStatus) }}</p>
          </div>
          <!-- <input type="text" class="form-control" id="id" placeholder="id" v-model="id" :disabled="disabled"> -->
          <label for="orderNoToAction" class="form-label">Order No.</label>
          <input type="text" class="form-control" id="orderNo" placeholder="Order Number" v-model="orderNo" :disabled="disabled">
          <br>
          <label for="dateToAction" class="form-label">Date to Action</label>
          <input type="date" class="form-control" id="dateToAction" placeholder="Name" v-model="date" :disabled="disabled">
          <br>
          <label for="marketplace" class="form-label">Marketplace</label>
          <select class="form-select" id="marketplace" v-model="marketplace" @change="changeMarketplace" :disabled="disabled">
            <option value="">Select marketplace</option>
            <option value="shopee">Shopee</option>
            <option value="lazada">Lazada</option>
          </select>
          <br>
        
          <div >
              <!-- <label class="form-label">Delivery Information</label> -->
              <label v-if="orderStatus === 'READY_TO_SHIP' || orderStatus === 'ready_to_ship'" class="form-label small text-danger"> &nbsp;&nbsp;*please fill out delivery detail</label>
              <br> 
              <!-- For update courier detail -->
              <!-- Radior button -->
              <div v-if="orderStatus === 'READY_TO_SHIP' || orderStatus === 'ready_to_ship'" > 
                  <label class="form-label">Delivery by: </label><br>
                  <input type="radio" id="self" value="self" v-model="deliveryBy" ><label for="one">Self</label><br>                  
                  <input type="radio" id="warehouse" value="warehouse" v-model="deliveryBy" ><label for="two">Warehouse</label><br> 
                  <input type="radio" id="courier" value="courier" v-model="deliveryBy" ><label for="two">Courier</label><br>
              
                <br>
                <!-- Dropdown List -->
                Courier
                <select class="form-select" id="courier" v-model="courier" @change="changeDelivery" >
                  <option value="">Select courier</option>
                  <option value="EMS">EMS</option>
                  <option value="KERRY">KERRY</option>
                  <option  value="FLASH">FLASH</option>
                </select> 

                <label for="trackToAction" class="form-label">Tracking No.</label>
                <input type="text" class="form-control" id="trackNo" placeholder="Tracking No." v-model="trackNo">
              </div>

              <!-- For View Only -->
               <!-- Radior button -->
              <div v-else-if="orderStatus != 'READY_TO_SHIP' && orderStatus != 'ready_to_ship'" >
                <fieldset :disabled="disabled">
                  <label class="form-label">Delivery by: </label><br>
                  <input type="radio" id="self" value="self" v-model="deliveryBy" ><label for="one">Self</label><br>                  
                  <input type="radio" id="warehouse" value="warehouse" v-model="deliveryBy" ><label for="two">Warehouse</label><br> 
                  <input type="radio" id="courier" value="courier" v-model="deliveryBy" ><label for="two">Courier</label><br>   
            
                  <br>
               
                  Courier: 
                  <select class="form-select" id="courier" v-model="courier" @change="changeCourier">
                      <option value="">Open this to select courier</option>
                      <option value="">Select courier</option>
                      <option value="EMS">EMS</option>
                      <option value="KERRY">KERRY</option>
                      <option  value="FLASH">FLASH</option>
                  </select>  

                  <br>
                  <label for="trackToAction" class="form-label">Tracking No.</label>
                  <input type="text" class="form-control" id="trackNoId" placeholder="Tracking No." v-model="trackNo"> 
                </fieldset>
              </div>
          </div>
        </div>
        <!-- Product Line Item -->
        <div class="mb-3">
          <label class="form-label">Line Items</label>
          <div class="responsive-table">
            <table class="table table-sm table-striped text-center">
              <col>
              <col width="100">
              <col width="100">
              <col width="65">
              <!-- Header Table -->
              <thead>
                <tr>
                  <th>#</th>
                  <th>SKU</th>                  
                  <th>Price</th>
                  <th>Item</th>
                  <th>Subtotal</th>
                  <th v-if="id === 'add'"></th>
                </tr>
              </thead>
              <!-- Detail Table -->
              <tbody>
                <tr v-for="(item, idx) in items" :key="idx">
                  <td>{{idx + 1}}</td>
                  <td>{{item.skuId.name}}</td>                   
                  <td>{{item.price.toLocaleString()}}</td>  
                  <td>{{item.amount}}</td>          
                  <td>{{getSubTotal(item.price,item.amount).toLocaleString()}}</td>
                  <td v-if="id === 'add'"><button type="button" class="btn-close" aria-label="Close" @click="removeItem(idx)"></button></td>
                </tr>
                <!-- Summary -->
                <tr>
                  <td><strong>Total</strong></td>
                  <td></td>                  
                  <td></td>
                  <td><strong>{{getCountItemsListItem().toLocaleString()}}</strong></td>
                  <td><strong>{{getGrandTotal().toLocaleString()}}</strong></td>
                </tr>
              </tbody>
              <tfoot v-if="id === 'add'">
                <tr>
                  <td><input type="number" class="form-control form-control-sm" id="price" placeholder="Price" v-model="price"></td>
                  <td><input type="number" class="form-control form-control-sm" id="amount" placeholder="Amount" v-model="amount"></td>
                  <td><button type="button" class="btn btn-sm btn-outline-secondary" @click="addItem()"><i class="bi-plus-circle"></i></button></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <hr>
        <div v-if="orderStatus === 'READY_TO_SHIP'" class="mb-3 text-end">         
        <button type="button" 
          class="btn btn-primary" 
          @click="updateItem()"
          >Confirm to Send Order</button>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
import {Offcanvas} from 'bootstrap'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    id: String
  },
  mounted() {
      Promise.all([
        this.getAllOrder(),
        this.getAllSKU()
      ])
        .then(result => {
          console.debug(result)
      })
        .catch(console.error)
    
    if (this.id === 'add') {
      Promise.all([this.getAllOrder(),this.draft()]).then(([skuList, o]) => {
        console.debug(skuList, o)
        this.skuList = skuList
        this.date = this.formatDate(o.date)
        this.marketplace = o.marketplace
        this.orderNo = o.orderNo
        this.trackNo = o.trackNo
        this.orderStatus = o.orderStatus
        this.deliveryBy = o.deliveryBy
        this.courier = o.courier
        this.items = o.items 
        this._offcanvas = new Offcanvas(this.$refs.OrderItem)
        this.disabled = false
        this._offcanvas.show()
        this.$refs.OrderItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    } else {      
      this.get(this.id).then(o => {
        console.log('get id else: ',this.id)
        console.log(this.orderNo)
        console.log(this.items)
        console.debug(o)
        this.date = this.formatDate(o.date)
        this.marketplace = o.marketplace
        this.orderNo = o.orderNo
        this.trackNo = o.trackNo
        this.orderStatus = o.orderStatus
        this.deliveryBy = o.deliveryBy
        this.courier = o.courier
        this.items = o.items 
        this._offcanvas = new Offcanvas(this.$refs.OrderItem)
        this.disabled = true
        this._offcanvas.show()
        this.$refs.OrderItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    }
  },
  computed: {
    ...mapGetters('Order', {
      orderList: 'all'
    }),
    skus () {
      return this.skuList.filter(x => x.marketplaces.has(this.marketplace))
    },
    totalAmount() {
      let total = item.price*item.amount;
      return total;
    }
  },
  data() {
    return {
      _offcanvas: null,
      disabled: false,
      isSaving: false,
      isDeleting: false,
      date: new Date(),
      orderNo: '',
      trackNo: '',
      orderStatus: '',
      deliveryBy: '',
      courier: '',
      marketplace: '',
      skuList: [],
      items: [],
      skuId: '',
      price: 0,
      amount: 0
    }
  },
  methods: {
     ...mapActions('Order', {
      draft: 'draft',
      get: 'get',
      save: 'save',
      update: 'update'
    }),
    ...mapActions('SKU', {
      getAllSKU: 'getAll'
    }),
    ...mapActions('Order', {
      getAllOrder: 'getAll'
    }),
    close() {
      this.$router.replace({ name: 'order' })
    },
    changeMarketplace () {
      this.skuId = ''
    },
    removeItem (idx) {
      this.items.splice(idx, 1)
    },
    addItem () {
      const sku = this.skuList.find(x => x.id === this.skuId)
      if(sku) {
        console.debug(sku)
        this.items.push({
          skuId: this.skuId,
          sku,
          price: this.price,
          amount: this.amount
        })
      }
    },
    submit() {
      this.disabled = true
      this.isSaving = true
      const {date, marketplace, items} = this
      this.save({date, marketplace, items}).then(() => {
        this.disabled = false              
        this.isSaving = false
        this._offcanvas.hide()
      }).catch(console.error)
    },
    updateItem() {  

      console.log(this.orderStatus)
      let isNoti = false

      if (this.orderStatus == 'READY_TO_SHIP') {
       

        if (this.deliveryBy  == "self"){
          if(!this.trackNo  == "" && !this.trackNo == "undefined"  && !this.trackNo == ''
            && !this.courier == "" && !this.courier == "undefined"  && !this.courier == ''){
               this.orderStatus = 'ON_DELIVERY'
            }
            else  isNoti = true

        }   
      } else if (this.orderStatus = 'ON_DELIVERY') {
        this.orderStatus = 'SHIPPED'
      } else if (this.orderStatus = 'SHIPPED') {
        this.orderStatus = 'COMPLETED'
      }
      
      if (this.deliveryBy == 'warehouse' || this.deliveryBy == 'courier') {
          const {id, trackNo, orderStatus, courier, deliveryBy} = this
          this.update({ id, trackNo, orderStatus, courier, deliveryBy }).then(() => {
            this.disabled = false              
            this.isSaving = false
            this._offcanvas.hide()
          }).catch(console.error)
      } else if (this.deliveryBy  == "" || this.deliveryBy == "undefined" || this.deliveryBy == ''
        || this.trackNo  == "" || this.trackNo == "undefined"  || this.trackNo == ''
        || this.courier == "" || this.courier == "undefined"  || this.courier == ''){ 

          console.log('else if updateItem')  
          console.log(this.trackNo + this.deliveryBy + this.courier)
          isNoti = true

      } else {    
        console.log('else updateItem')  
        console.log(this.trackNo + this.deliveryBy + this.courier)

        this.disabled = true
          this.isSaving = true
          console.log('start updateItem')
          const {id, trackNo, orderStatus, courier, deliveryBy} = this
          this.update({ id, trackNo, orderStatus, courier, deliveryBy }).then(() => {
            this.disabled = false              
            this.isSaving = false
            this._offcanvas.hide()
          }).catch(console.error)
      }

        if (isNoti)
          alert('Please complete or check the information completely!' )
        else 
          alert('Done!' )

    },
    formatDate(date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    },
    getStatus(orderStatus){
      var textStatus = ""
      if (orderStatus === 'READY_TO_SHIP' || orderStatus === 'ready_to_ship'){
        textStatus= 'Ready to ship'
      } else if (orderStatus === 'ON_DELIVERY' || orderStatus === 'on_delivery') {
        textStatus= 'On delivery'
      } else if (orderStatus === 'SHIPPED' || orderStatus === 'shipped') {
        textStatus= 'Shipped'
      } else if (orderStatus === 'COMPLETED' || orderStatus === 'completed') {
        textStatus= 'Completed'
      } 
      return textStatus
    },
    getSubTotal(amount, price){
        var subtotal = 0
        subtotal = amount*price
      return  subtotal
     },
    getGrandTotal(){
        var grandTotal = 0
        var price = 0
        var amount = 0
        var items = this.items
        for(let i = 0;i < items.length; i++ ) {
          price = items[i].price
          amount = items[i].amount
          grandTotal = grandTotal+(price*amount)       
        }
      return  grandTotal
     },
    getCountItemsListItem(){
        var amount = 0
        var countItem = 0
        var items = this.items
        for(let i = 0;i < items.length; i++ ) {
          amount = items[i].amount
          countItem = countItem+amount     
        }
      return  countItem
     },

    Logger() {
      console.log('items: '+this.items);
      console.log('price: '+this.items[0].price);
      console.log('id: '+this.items[0]._id);
    }
  }
}
</script>
