
import {IBookings} from "../booking/model/bookings.model";
import {convertDateTimeFromServer, displayDefaultDateTime} from "./date-utils";
import {Redirect} from "react-router";
import React from "react";
import axios from 'axios';
import {Storage} from 'react-jhipster';
import moment from 'moment';


async function  completeBooking(response) {
    const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');

    const data = await axios("http://localhost:8080/api/bookings/order", {
        method: "PUT",
        data:response,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then((t) => {
        <Redirect
            to={{
                pathname: '/pay-done',

            }}
        />
        //return t.json();
    });

}



export default async function displayRazorpay(bookingForm) {
    console.log(bookingForm)
    const newBooking= {
        checkInDate: convertDateTimeFromServer(moment(bookingForm.startDate,'Do MMM , YY')),
         checkOutDate: convertDateTimeFromServer(moment(bookingForm.endDate,'Do MMM , YY')),
     childPricePerNight: bookingForm.pricePerChild,
     pricePerNight : bookingForm.pricePerAdult,
     discount : bookingForm.discount,
     numOfNights : bookingForm.numberActions,
     totalAmount : bookingForm.totalAmount,
     user : {id: bookingForm.customerId},
     listing : {id: Number(bookingForm.listingId)},
     createdDate : displayDefaultDateTime(),
        }
    const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
    //alert(newBooking.checkInDate)
    console.log(newBooking)
    const data = await axios("http://localhost:8080/api/bookings/order", {
        method: "POST",
        data:newBooking,
        headers: {
            'Authorization': `Bewarer ${token}`
        }
    }).then((t) => {
        console.log(t)
        console.log("..........")
        const options = {
            key: "rzp_test_pvJmuk3mYLgwDy",
            currency:"INR",
            amount: bookingForm.totalAmount,
            name: "CampsitesIndia",
            description: "Booking "+bookingForm.listingTile,
            // image: "http://localhost:1337/logo.png",
            order_id: t.data.razorpayOrderId,

            handler: function (response) {
                console.log(response);
                let paymentResponse = {
                    razorpayOrderId:response.razorpay_order_id,
                    razorpayPaymentId:response.razorpay_payment_id,
                    razorpaySignature:response.razorpay_signature
                }
                //  completeBooking(paymentResponse)
                alert("PAYMENT ID ::" + response.razorpay_payment_id);
                alert("ORDER ID :: " + response.razorpay_order_id);
                alert("Signature :: " + response.razorpay_signature);



            },
            prefill: {
                name: "Campsites India",
                email: "email@campsitesindia.in",
                contact: "9999999999",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }).catch(function (error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

    });





}
