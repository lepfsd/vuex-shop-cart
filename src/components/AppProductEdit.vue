<template>
    <div>
        <hr>
        <input type="text" placeholder="selecciona un producto" v-model="title">
    </div>
</template>

<script>
export default {
    name: 'AppProductEdit',
    computed: {
        //selectedProduct() {
        //    return this.$store.getters.selectedProduct;
        //}
        title: {
            get() {
                return this.$store.getters.selectedProduct.title;
            },
            set(value) {
                this.$store.commit('editProduct', {title: value});
            }   
        }
    }
}
</script>