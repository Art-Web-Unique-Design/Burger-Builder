import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, { loading: false, purchased: true, order: state.orders.concat(newOrder) });
}
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}
const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { orders: action.orders, loading: false });
}
const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false });
}
const deleteOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
}
const deleteOrderSuccess = (state, action) => {
    let newArray = action.orders.slice().filter((item) => item.id !== action.orderId);
    return updateObject(state, { orders: newArray, loading: false });
}
const deleteOrderFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // Cases about form and purchasing
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        // Cases about fetching orders from the server
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        // Cases about deleting order from the server
        case actionTypes.DELETE_ORDER_START: return deleteOrderStart(state, action);
        case actionTypes.DELETE_ORDER_SUCCESS: return deleteOrderSuccess(state, action);
        case actionTypes.DELETE_ORDER_FAIL: return deleteOrderFail(state, action)
        default: return state;
    }
};

export default reducer;