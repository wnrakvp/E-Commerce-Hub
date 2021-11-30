import{O as e}from"./bootstrap.esm.25e60e88.js";import{_ as a}from"./index.4ccc0a35.js";import{o as l,c,s}from"./vendor.5c96b8c5.js";const o={data(){return{}},mounted(){new e(this.$refs.SKUItem).show(),this.$refs.SKUItem.addEventListener("hidden.bs.offcanvas",this.close)},methods:{close(){this.$router.replace({name:"sku"})}}},t={class:"offcanvas offcanvas-end",tabindex:"-1",ref:"SKUItem","aria-labelledby":"SKUItemLabel"},i=s('<div class="offcanvas-header"><h5 class="offcanvas-title" id="SKUItemLabel">SKU Item</h5><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button></div><div class="offcanvas-body"><form><div class="mb-3"><label for="skuName" class="form-label">SKU Name</label><input type="text" class="form-control" id="skuName" placeholder="Name"></div><div class="mb-3"><label for="skuDescription" class="form-label">Description</label><textarea class="form-control" id="skuDescription" rows="3"></textarea></div><div class="mb-3"><label for="skuImage" class="form-label">Image</label><input class="form-control" type="file" id="skuImage"></div><div class="mb-3"><label for="originalPrice" class="form-label">Original Price</label><input type="number" min="0" class="form-control" id="originalPrice" placeholder="Price"></div><div class="mb-3"><label for="selectProduct" class="form-label">Product</label><select class="form-select" id="selectProduct"><option selected>Open this to select product</option><option value="1">aaa</option><option value="2">bbbb</option><option value="3">ccc</option></select></div><fieldset class="mb-3"><legend class="form-label">Marketplace</legend><div class="form-check"><input class="form-check-input" type="checkbox" id="checkboxAllMarketplace" value="all"><label class="form-check-label" for="checkboxAllMarketplace">All</label></div><div class="input-group"><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="checkboxShopee" value="shopee"><label class="form-check-label" for="checkboxShopee">Shopee</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="checkboxLazada" value="lazada"><label class="form-check-label" for="checkboxLazada">Lazada</label></div><div class="form-check form-check-inline"><input class="form-check-input" type="checkbox" id="checkboxJD" value="" disabled><label class="form-check-label" for="checkboxJD">JD Central</label></div></div></fieldset><hr><div class="mb-3 text-end"><button type="submit" class="btn btn-primary">Add SKU</button></div></form></div>',2),r=[i];function n(d,b,f,m,p,h){return l(),c("div",t,r,512)}var x=a(o,[["render",n]]);export{x as default};
