import { ref } from 'vue'

export const cart = ref([])

export const addToCart = (item) => {
  cart.value.push(item)
}