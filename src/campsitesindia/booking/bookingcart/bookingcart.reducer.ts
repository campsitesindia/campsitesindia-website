import {number, string} from "prop-types";
import {defaultValueBookingCart, IBookingCart} from "../model/bookingcart.model";
import {defaultValue} from "../model/bookings.model";

const initialState = {
    bookingcart:defaultValueBookingCart,
    bookingItemExist:false,
    booking:defaultValue
}


export const ADD_TO_BOOKING_CART = 'ADD_TO_CART';
export const BOOKING_CART_PAYMENT = 'BOOKING_CART_PAYMENT';
export const REMOVE_ITEMS_FROM_BOOKING_CART = 'REMOVE_CART';

//add cart action
export const addToCart= (bookingFormData)=>{
    return{
        type: ADD_TO_BOOKING_CART,
        payload:bookingFormData
    }
}

//add cart action
export const processRazorPaymentForBooking= (paymentresponse)=>{
    return{
        type: BOOKING_CART_PAYMENT,
        payload:paymentresponse
    }
}

const bookingCartReducer= (state = initialState,action)=>{
    console.log(action.payload)

    if(action.type === ADD_TO_BOOKING_CART){

        return{
            ...state,
            bookingcart:action.payload,
            bookingItemExist: true
        }
    }
    if(action.type === BOOKING_CART_PAYMENT){

        return{
            ...state,
            booking:action.payload,
        }
    }
    else{

        return state;
    }
}
export default bookingCartReducer
