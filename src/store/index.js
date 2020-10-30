import Vue from 'vue';
import Vuex from 'vuex';
import shop from '../api/shop';
import api from '../api/shop';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        products: [],
        cart: [],
        checkoutError: false
    },
    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        incrementProductQuantity(state, item) {
            item.quantity++;
        },
        addProductToCart(state, product) {
            state.cart.push({
                id: product.id,
                quantity: 1
            });
        },
        decrementProductInventory(state, product) {
            product.inventory--;
        },
        incrementProductInventory(state, item) {
            const product = state.products.find(product => product.id === item.id);
            product.inventory += item.quantity;
        },
        removeProductFromCart(state, index){
            state.cart.splice(index, 1);
        },
        emptyCart(state) {
            state.cart = [];
        },
        setCheckoutError(state, error) {
            state.checkoutError = error;
        }
    },
    actions: {
        getProducts({commit}) {
            return new Promise((resolve) => {
                api.getProducts(products => {
                    commit("setProducts", products);
                    resolve();
                });
            });
        },
        addProductToCart(context, product) {
            // hay inventario en el producto
            if(product.inventory === 0) return;
            // existe ya en el carrito
            const item = context.state.cart.find(item => item.id === product.id);

            if(item) {
                // si es si, anadir uno o mas
                context.commit('incrementProductQuantity', item);
            } else {
                // Si no es asi, anadir el product al carrito
                context.commit('addProductToCart', product);
            }

            //restar al invetario el producto
            context.commit('decrementProductInventory', product);

        },
        removeProductFromCart(context, index) {
            const item = context.state.cart[index];

            //eliminar el producto del carrito
            context.commit('removeProductFromCart', index);

            //restaurar el inventario
            context.commit('incrementProductInventory', item);

        },
        checkout({commit, state}) {
            shop.buyProducts(state.cart, () => {
                //mutacion para vaciar el carrito
                commit('emptyCart');

                // establecer que no hay errores 
                commit('setCheckoutError', false);
            }, () => {
                // establcer que hay errores
                commit('setCheckoutError', true);
            })
        }
    },
    getters: {
        productOnStock(state) {
            return state.products.filter(product => {
                return product.inventory > 0;
            });
        },
        productsOnCart(state) {
            return state.cart.map(item => {
                const product = state.products.find(product => product.id === item.id)
                return {
                    title: product.title,
                    price: product.price,
                    quantity: item.quantity 
                }
            });
        },
        cartTotal(state, getters) {
            return getters.productsOnCart.reduce((total, current) => total + current.price * current.quantity, 0)
        }
    },
    modules: {

    }
});