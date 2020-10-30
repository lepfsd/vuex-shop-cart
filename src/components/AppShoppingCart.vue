<template>
    <div>
        <h2>carrito</h2>
        <hr>
        <ul>
            <li v-for="(item, $index) in cartItems" :key="item.id">
                {{ item.title }} ({{ item.quantity }})
                <button @click="removeItem($index)">x</button>
            </li>
        </ul>
        <button v-if="cartItems.length" @click="checkout">checkout</button>
        <hr>
        <h4>Total: {{ cartTotal  || 0 }}</h4>
        <div v-if="$store.state.checkoutError">
            <p>error procesando el pago...</p>
        </div>
    </div>
</template>

<script>
import { currency } from '../utils/currency';

export default {
    name: 'AppShoppingCart',
    computed: {
        cartItems() {
            return this.$store.getters.productsOnCart
        },
        cartTotal() {
            return currency(this.$store.getters.cartTotal, '$');
            
        }
    },
    methods: {
        removeItem(index) {
            this.$store.dispatch('removeProductFromCart', index);
        },
        checkout() {
            this.$store.dispatch('checkout');
        }

    }
}
</script>