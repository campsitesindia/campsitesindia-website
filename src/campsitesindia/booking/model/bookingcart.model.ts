import {number, string} from "prop-types";
import {useState} from "react";

export interface IBookingCart {
    listingId:string,
    guestAdults:number,
    guestChildren:number,
    pricePerChild:number,
    pricePerAdult:number,
    totalAmountAdults:number,
    totalAmountChildren:number,
    totalAmount:number,
    startDate:string,
    endDate:string,
    numberOfDays:number,
    discount:number,
    listingTile:string,
    imageSrc:string,
    customerId:number

}
export const defaultValueBookingCart: Readonly<IBookingCart> = {
    listingId:'',
    guestAdults:0,
    guestChildren:0,
    pricePerChild:0,
    pricePerAdult:0,
    numberOfDays:0,
    discount:0,
    listingTile:'',
    startDate:'',
    endDate:'',
    imageSrc:'',
    customerId:0,
    totalAmountAdults:0,
    totalAmountChildren:0,
    totalAmount:0
};
