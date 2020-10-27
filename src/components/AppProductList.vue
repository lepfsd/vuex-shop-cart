<template>
    <div>
        <h1>listado de productos</h1>
        <hr>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.title }} | {{ product.price }}
                <i> {{ product.inventory }} </i>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '../api/shop';
export default {
    name: 'AppProductList',
    created() {
        api.getProducts(
            products => this.$store.commit('setProducts', products));
        
    },
    computed: {
        products() {
            return this.$store.state.products;
        }
    }
}
</script>

<style scoped>
    ul {
        text-align: left;
    }
</style>