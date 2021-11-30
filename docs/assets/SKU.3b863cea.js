var C=Object.defineProperty;var g=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,A=Object.prototype.propertyIsEnumerable;var b=(s,o,e)=>o in s?C(s,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[o]=e,n=(s,o)=>{for(var e in o||(o={}))P.call(o,e)&&b(s,e,o[e]);if(g)for(var e of g(o))A.call(o,e)&&b(s,e,o[e]);return s};import{_ as f}from"./index.89ac767d.js";import{o as l,c as i,a as t,t as d,b as k,f as r,m as v,j as w,r as _,F as u,k as y,d as m,w as S,l as I,p as K}from"./vendor.195f37e3.js";import"./bootstrap.esm.25e60e88.js";var z="/e-commerce-hub-web/assets/shopee.7d77f74c.svg",V="/e-commerce-hub-web/assets/lazada.9325c4a5.svg";const j={props:{title:String,details:String,imageURL:String,price:Number,isShopee:Boolean,isLazada:Boolean}},F={class:"card mb-3"},N={class:"row g-0"},M={class:"col-md-4"},R=["src","alt"],D={class:"col-md-8"},E={class:"card-body"},G={class:"card-title"},T={class:"card-text",style:{display:"-webkit-box","-webkit-line-clamp":"3","-webkit-box-orient":"vertical",overflow:"hidden","text-overflow":"ellipsis"}},q={class:"card-text"},H={class:"text-muted"},J={class:"text-muted"},O=r(" Marketplace: "),Q={key:0,src:z,alt:"shopee",class:"img-fluid rounded-start",width:"24",height:"24"},W={key:1,src:V,alt:"lazada",class:"img-fluid rounded-start",width:"38",height:"38"};function X(s,o,e,$,x,L){return l(),i("div",F,[t("div",N,[t("div",M,[t("img",{src:e.imageURL,alt:e.title,class:"img-fluid rounded-start"},null,8,R)]),t("div",D,[t("div",E,[t("h6",G,d(e.title),1),t("p",T,[t("small",null,d(e.details),1)]),t("p",q,[t("small",H,"Price: "+d(e.price?e.price:"12345"),1),t("small",J,[O,e.isShopee?(l(),i("img",Q)):k("",!0),e.isLazada?(l(),i("img",W)):k("",!0)])])])])])])}var Y=f(j,[["render",X]]);const Z={components:{SKUItem:Y},mounted(){Promise.all([this.getAllProducts(),this.getAllSKU()]).then(s=>{console.debug(s)}).catch(console.error)},computed:n(n({},v("Products",{productList:"all"})),v("SKU",{skuList:"all"})),data(){return{}},methods:n(n({},w("Products",{getAllProducts:"getAll"})),w("SKU",{getAllSKU:"getAll",filterById:"filterById"}))},tt={class:"my-3 p-3 bg-body rounded shadow-sm"},et={class:"d-flex justify-content-between align-items-center pb-2"},st=t("h6",{class:"h6 my-0"},"SKU Management",-1),ot={class:"btn-group",role:"group"},at={class:"btn-group",role:"group"},lt=t("button",{id:"FilterProductItem",type:"button",class:"btn btn-sm btn-outline-secondary dropdown-toggle","data-bs-toggle":"dropdown","data-bs-auto-close":"true","aria-expanded":"false"},[t("i",{class:"bi-funnel"}),r(" Filter by Product")],-1),it={class:"dropdown-menu","aria-labelledby":"FilterProductItem"},nt=["onClick"],dt=["onClick"],ct=t("i",{class:"bi-plus-circle"},null,-1),rt=r(" Add"),_t=[ct,rt],ut=t("small",{class:"d-block text-center mt-3"},[t("a",{href:"#"},"View More")],-1);function mt(s,o,e,$,x,L){const h=_("router-link"),U=_("SKUItem"),B=_("router-view");return l(),i(u,null,[t("div",tt,[t("div",et,[st,t("div",ot,[t("div",at,[lt,t("ul",it,[t("li",null,[t("a",{class:"dropdown-item",onClick:o[0]||(o[0]=a=>s.filterById(null))},"View All")]),(l(!0),i(u,null,y(s.productList,(a,c)=>(l(),i("li",{key:c},[t("a",{class:"dropdown-item",onClick:p=>s.filterById(a.id)},d(a.name),9,nt)]))),128))])]),m(h,{to:{name:"sku-item",params:{id:"add"}},custom:""},{default:S(({navigate:a})=>[t("button",{class:"btn btn-sm btn-outline-secondary",onClick:a},_t,8,dt)]),_:1})])]),(l(!0),i(u,null,y(s.skuList,(a,c)=>(l(),I(h,{to:{name:"sku-item",params:{id:a.id}},key:c,custom:""},{default:S(({navigate:p})=>[m(U,K({onClick:p},{title:a.name,details:a.desc,imageURL:a.image,isShopee:a.isShopee,isLazada:a.isLazada}),null,16,["onClick"])]),_:2},1032,["to"]))),128)),ut]),m(B)],64)}var ft=f(Z,[["render",mt]]);export{ft as default};
