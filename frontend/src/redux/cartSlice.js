import {createSlice} from '@reduxjs/toolkit';

const getItemId = (item) => item.id || item.productId;

const normalizeCartItems = (items) => {
    return items.reduce((accumulator, item) => {
        const itemId = getItemId(item);
        const existingItem = accumulator.find((cartItem) => getItemId(cartItem) === itemId);

        if (existingItem) {
            existingItem.qty += item.qty || 1;
        } else {
            accumulator.push({ ...item, qty: item.qty || 1 });
        }

        return accumulator;
    }, []);
};

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? normalizeCartItems(JSON.parse(localStorage.getItem('cartItems')))
        : [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemId = getItemId(item);
            const existItem = state.cartItems.find((x) => getItemId(x) === itemId);
            if (existItem) {
                state.cartItems = state.cartItems.map((x) => 
                    getItemId(x) === itemId
                        ? { ...x, qty: (x.qty || 1) + (item.qty || 1) }
                        : x
                );
            } else {
                state.cartItems = [...state.cartItems, { ...item, qty: item.qty || 1 }];
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        setCartQty: (state, action) => {
            const { itemId, qty } = action.payload;
            state.cartItems = state.cartItems.map((item) => 
                getItemId(item) === itemId ? { ...item, qty } : item
            );
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((x) => getItemId(x) !== itemId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    }
});

export const { addToCart, setCartQty, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;