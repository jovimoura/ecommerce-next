import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state: any, action: any) => {
      const itemExists = state.find(
        (item: any) => item.id === action.payload.id
      )
      if (itemExists) {
        itemExists.quantity++
      } else {
        state.push({ ...action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state: any, action: any) => {
      const item = state.find((item: any) => item.id === action.payload)
      item.quantity++
    },
    decrementQuantity: (state: any, action: any) => {
      const item = state.find((item: any) => item.id === action.payload)
      if (item.quantity === 1) {
        const index = state.findIndex((item: any) => item.id === action.payload)
        state.splice(index, 1)
      } else {
        item.quantity--
      }
    },
    removeFromCart: (state: any, action: any) => {
      const index = state.findIndex((item: any) => item.id === action.payload)
      state.splice(index, 1)
    }
  }
})

export const cartReducer = cartSlice.reducer

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} = cartSlice.actions
