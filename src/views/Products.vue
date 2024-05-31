<template>
  <div>
    <b-form-select
        v-model="productSelected"
        :options="products"
        value-field="id"
        text-field="title"
        @change="getProduct"
    ></b-form-select>
    <div v-if="productSelected !== ''" class="mt3">
      Is available?
      <h5 v-if="productInfo.product.rentable" style="color: green">
        Available
      </h5>
      <h5 v-else style="color: red">
        Not available
      </h5>
    </div>

    <b-table
        class="mt3"
        v-if="productInfo != null"
        striped
        hover
        :items="mapProductInfo"
        :fields="fields"
    ></b-table>
    <b-form-row v-if="productSelected !== ''">
      <b-col cols="4">
        Select Commitment
        <b-form-select
            v-model="optionSelected"
            :options="options"
        ></b-form-select>
      </b-col>
      <b-col cols="4">
        <div v-if="optionSelected === 0">
          Enter months:
        </div>
        <div v-else>
          Enter early return month count
        </div>
        <b-input v-model="input"></b-input>
      </b-col>
    </b-form-row>
    <b-form-row v-if="productSelected !== ''">
      <b-col cols="4" class="mt-3">
        <b-button @click="submit"> Process</b-button>
      </b-col>
    </b-form-row>
    <div v-if="response != null">
      <b-form-row>
        For {{ response.months }} month price will be
        {{ response.totalPrice }} Eur
      </b-form-row>
      <b-form-row v-if="response.message != null">
        {{ response.message }}
      </b-form-row>
    </div>
  </div>
</template>

<script>

import {getCalculation, getProductInfo, getProducts} from "@/api/wrapper.api";
import {mapMutations} from "vuex";

export default {
  name: "Products",
  components: {},
  data() {
    return {
      fields: ["commitmentMonths", "price"],
      options: [
        {value: 0, text: "No commitment"},
        {value: 3, text: "3 Month commitment"},
        {value: 6, text: "6 Month commitment"}
      ],
      optionSelected: 0,
      input: null,
      response: null
    };
  },
  async mounted() {
    let vm = this;
    let products = (await getProducts()).data;
    vm.setProducts(products);
  },
  computed: {
    products: function () {
      return this.$store.state.form.products;
    },
    productInfo: function () {
      return this.$store.state.form.productInfo;
    },
    productSelected: {
      get() {
        return this.$store.state.form.productSelected;
      },
      set(value) {
        this.$store.commit("form/SET_SELECTED_PRODUCT", value);
      }
    },
    mapProductInfo: function () {
      return this.productInfo.prices.map(x => {
        return {commitmentMonths: x.commitmentMonths, price: x.value};
      });
    }
  },

  methods: {
    ...mapMutations("form", {
      setProducts: "SET_PRODUCTS",
      setProductInfo: "SET_PRODUCT_INFO"
    }),

    getProduct: async function () {
      let vm = this;
      let info = (await getProductInfo(this.productSelected)).data;
      console.log(info);
      vm.setProductInfo(info);
    },
    submit: async function () {
      let data = {
        productId: this.productSelected,
        commitment: this.optionSelected,
        returnMonths: this.input
      }
      this.response = (await getCalculation(data)).data;
    }
  }
};
</script>
<style lang="scss">
// Import Bootstrap and BootstrapVue source SCSS files
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/src/index.scss";

html,
body {
  overflow-x: hidden; /* Prevent scroll on narrow devices */
}

body {
  padding-top: 80px;
}

@media (max-width: 991.98px) {
  .offcanvas-collapse {
    position: fixed;
    top: 56px; /* Height of navbar */
    bottom: 0;
    left: 100%;
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
    overflow-y: auto;
    visibility: hidden;
    background-color: #343a40;
    transition: visibility 0.3s ease-in-out, -webkit-transform 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out;
    transition: transform 0.3s ease-in-out, visibility 0.3s ease-in-out,
    -webkit-transform 0.3s ease-in-out;
  }
  .offcanvas-collapse {
    visibility: visible;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.75);
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.nav-underline .nav-link {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #6c757d;
}

.nav-underline .nav-link:hover {
  color: #007bff;
}

.nav-underline .active {
  font-weight: 500;
  color: #343a40;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.5);
}

.bg-purple {
  background-color: #6f42c1;
}

.lh-100 {
  line-height: 1;
}
.lh-125 {
  line-height: 1.25;
}
.lh-150 {
  line-height: 1.5;
}
.form-group.required label:before {
  content: "* ";
  color: red;
}
</style>
