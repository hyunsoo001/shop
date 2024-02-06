import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],

  reducers: {
    addCount(state, action) {
      const itemId = action.payload;
      // 해당 id를 가진 아이템을 찾습니다.
      const selectedItem = state.find((item) => item.id === itemId);
      selectedItem.count = selectedItem.count + 1;
      },
      
      addProduct(state, action) {
            let itemId = action.payload.id;
            let itemName = action.payload.title;
        
       
            if (state.find((item) => item.id === itemId)) {
                const selectedItem = state.find((item) => item.id === itemId);
                selectedItem.count = selectedItem.count + 1;
            }
            else
                state.push({ id: itemId, name: itemName, count: 1 });
      }
  },
});

export let { addCount, addProduct } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
