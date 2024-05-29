<template>
  <div class="container">
    <header class="jumbotron">
      <b-container fluid>
        <Products/>
      </b-container>
    </header>
  </div>
</template>

<script>
import Products from "@/views/Products.vue";

export default {
  name: 'Home',
  components: { Products },
  data() {
    return {
      content: ''
    };
  },
  mounted() {

  }
};
</script>
