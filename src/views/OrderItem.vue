<template>
<div class="offcanvas offcanvas-end" tabindex="-1" ref="OrderItem" aria-labelledby="OrderItemLabel">
  <div class="offcanvas-header">
     <!-- <button class="btn btn-sm btn-outline-secondary" @click="Logger">
        <i class="bi-plus-circle"></i> Logger
      </button> -->
    <h5 class="offcanvas-title" id="ProductItemLabel">{{id==='add'?'Add':''}} Order Item</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <form @submit.prevent="submit">
      <fieldset :disabled="disabled">
        <div class="mb-3">
          <label for="orderNoToAction" class="form-label">Order No.</label>
          <input type="text" class="form-control" id="orderNo" placeholder="Order Number" v-model="orderNo">
          <br>
          <label for="dateToAction" class="form-label">Date to Action</label>
          <input type="date" class="form-control" id="dateToAction" placeholder="Name" v-model="date">
          <br>
          <label for="marketplace" class="form-label">Marketplace</label>
          <select class="form-select" id="marketplace" v-model="marketplace" @change="changeMarketplace">
            <option value="">Open this to select marketplace</option>
            <option value="shopee">Shopee</option>
            <option value="lazada">Lazada</option>
          </select>
          <br>
          <label for="delivery" class="form-label">Delivery</label>
          <br>  
          <input type="radio" id="radioboxSelf" value="Self" v-model="deliveryBy" >
          <label for="one">Self</label>
        
          <input type="radio" id="radioboxWarehouse" value="Warehouse" v-model="deliveryBy"> 
          <label for="one">Warehouse</label>
        
          <input type="radio" id="radioboxCourier" value="Courier" v-model="deliveryBy">
          <label for="two">Courier</label>              
          <br>
          <span>delivery By Test: {{ deliveryBy }}</span>
          <br>

          <select class="form-select" id="delivery" v-model="delivery" @change="changeDelivery">
            <option value="">Open this to select delivery</option>
            <option value="EMS">EMS</option>
            <option value="KERRY">KERRY</option>
            <option value="FLASH">FLASH</option>
          </select>
          <br>
          
          <label for="trackToAction" class="form-label">Tracking No.</label>
          <input type="text" class="form-control" id="trackNo" placeholder="Tracking No." v-model="trackNo">
          <br>

        </div>
        <div class="mb-3">
          <label class="form-label">Line Items</label>
          <div class="responsive-table">
            <table class="table table-sm table-striped text-center">
              <col>
              <col width="100">
              <col width="100">
              <col width="65">
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
              <tbody>
                <tr v-for="(item, idx) in items" :key="idx">
                  <td>{{idx + 1}}</td>
                  <td>{{item.sku.name}}</td>                   
                  <td>{{item.price.toLocaleString()}}</td>  
                  <td>{{item.amount}}</td>          
                  <td>{{getSubTotal(item.price,item.amount).toLocaleString()}}</td>
                  <td v-if="id === 'add'"><button type="button" class="btn-close" aria-label="Close" @click="removeItem(idx)"></button></td>
                </tr>
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
                  <td colspan="2">
                    <select class="form-select" id="marketplace" v-model="skuId">
                      <option value="">SKU</option>
                      <option v-for="(sku, idx) in skus" :key="idx" :value="sku.id">{{sku.name}}</option>
                    </select>
                  </td>
                  <td><input type="number" class="form-control form-control-sm" id="price" placeholder="Price" v-model="price"></td>
                  <td><input type="number" class="form-control form-control-sm" id="amount" placeholder="Amount" v-model="amount"></td>
                  <td><button type="button" class="btn btn-sm btn-outline-secondary" @click="addItem()"><i class="bi-plus-circle"></i></button></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <hr>
        <div v-if="id === 'add'" class="mb-3 text-end">
          <button type="submit" class="btn btn-primary">Publish</button>
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
    if (this.id === 'add') {
      Promise.all([this.getAllSKU(),this.draft()]).then(([skuList, o]) => {
        console.debug(skuList, o)
        this.skuList = skuList
        this.date = this.formatDate(o.date)
        this.marketplace = o.marketplace
        this.orderNo = o.orderNo
        this.trackNo = o.trackNo
        this.orderStatus = o.orderStatus
        this.deliveryBy = o.deliveryBy
        this.delivery = o.delivery
        this.items = o.items 
        this._offcanvas = new Offcanvas(this.$refs.OrderItem)
        this.disabled = false
        this._offcanvas.show()
        this.$refs.OrderItem.addEventListener('hidden.bs.offcanvas', this.close)
      }).catch(console.error)
    } else {
      this.get(Number(this.id)).then(o => {
        console.debug(o)
        this.date = this.formatDate(o.date)
        this.marketplace = o.marketplace
        this.orderNo = o.orderNo
        this.trackNo = o.trackNo
        this.orderStatus = o.orderStatus
        this.deliveryBy = o.deliveryBy
        this.delivery = o.delivery
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
      delivery: '',
      marketplace: '',
      skuList: [],
      items: [],
      skuId: '',
      price: 0,
      amount: 1
    }
  },
  methods: {
    close() {
      this.$router.replace({ name: 'order' })
    },
    changeMarketplace () {
      this.skuId = ''
    },
    checkRadio (e) {      
      console.log('radioboxSelf.value: '+radioboxSelf.value);
      console.debug('e.target.id: '+e.target.id)

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
    formatDate(date) {
      let d = new Date(date)
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      let year = d.getFullYear()
      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day
      return [year, month, day].join('-')
    },
    ...mapActions('Order', {
      draft: 'draft',
      get: 'get',
      save: 'save'
    }),
    ...mapActions('SKU', {
      getAllSKU: 'getAll'
    }),
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
      var form = document.getElementById("radioboxSelf");
      alert(form.elements["radioboxSelf"].value);



      console.log('items: '+this.items);
      console.log('price: '+this.items[1].price);
     
        var price = 0
        var sumItem = 0
        var total = 0
        var amount = 0
        var items = this.items
        for(let j = 0;j < this.items.length; j++ ) {
          
          console.log('j: '+j); 
          price = items[j].price  
          amount = items[j].amount  

          total = total+ (amount*price)
          // sumItem = sumItem+ items[j].amount  
          console.log('price: '+price);
          // console.log('amount: '+amount);
          console.log('total: '+total);
          // console.log('sum item: '+sumItem);

          // price = items[j].price 
          // console.log('Amount: '+items[j].amount);   
          // console.log('price: '+price);    
          
             
        }
    }
  }
}
</script>
