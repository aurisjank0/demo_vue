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
// @ is an alias to /src
import {
  getCalculation,
  getProductInfo,
  getProducts
} from "../api/wrapper.api";
import { mapMutations } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      fields: ["commitmentMonths", "price"],
      options: [
        { value: 0, text: "No commitment" },
        { value: 3, text: "3 Month commitment" },
        { value: 6, text: "6 Month commitment" }
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
    products: function() {
      return this.$store.state.form.products;
    },
    productInfo: function() {
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
    mapProductInfo: function() {
      return this.productInfo.prices.map(x => {
        return { commitmentMonths: x.commitmentMonths, price: x.value };
      });
    }
  },

  methods: {
    ...mapMutations("form", {
      setProducts: "SET_PRODUCTS",
      setProductInfo: "SET_PRODUCT_INFO"
    }),

    getProduct: async function() {
      let vm = this;
      let info = (await getProductInfo(this.productSelected)).data;
      console.log(info);
      vm.setProductInfo(info);
    },
    submit: async function() {
      let formData = new FormData();
      formData.append("productId", this.productSelected);
      formData.append("commitment", this.optionSelected);
      formData.append("returnMonths", this.input);
      this.response = (await getCalculation(formData)).data;
    }
  }
};
</script>
