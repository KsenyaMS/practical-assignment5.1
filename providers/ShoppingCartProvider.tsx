import { createStore } from "@reduxjs/toolkit";

export type ProductInCart = {
    id: number,
    count: number,
}

export type ShoppingCart = {
    products: ProductInCart[],
}

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_QUANTITY = 'ADD_QUANTITY';
export const SUB_QUANTITY = 'SUB_QUANTITY';
export const EMPTY_CART = 'EMPTY_CART';

export const addToCart = (id: number) => {
    return {
        type: ADD_TO_CART,
        id
    };
};
export const removeFromCart = (id: number) => {
    return {
        type: REMOVE_FROM_CART,
        id,
    };
};
export const subtractQuantity = (id: number) => {
    return {
        type: SUB_QUANTITY,
        id,
    };
};
export const addQuantity = (id: number) => {
    return {
        type: ADD_QUANTITY,
        id,
    };
};
export const emptyCart = () => {
    return {
        type: EMPTY_CART,
    };
};

const initialState: ShoppingCart = {
    products: [] as ProductInCart[]
};

export const ShoppinReducer = (state = initialState, action: { type: string, id?: number }) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                products: [...state.products, { id: action.id, count: 1 }],
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                products: state.products.filter(product => product.id !== action.id),
            };
        case ADD_QUANTITY:
            return {
                ...state,
                products: state.products.map(product => product.id === action.id
                    ? { ...product, count: product.count + 1 }
                    : product,
                ),
            };
        case SUB_QUANTITY:
            return {
                ...state,
                products: state.products.map(product => product.id === action.id
                    ? { ...product, count: product.count !== 1 ? product.count - 1 : 1 }
                    : product,
                ),
            };
        case EMPTY_CART:
            return {
                ...state,
                products: [],
            };
        default:
            return state;
    }
};

export const store = createStore(ShoppinReducer);