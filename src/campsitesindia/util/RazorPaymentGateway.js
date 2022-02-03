import {partialUpdateEntity} from "../booking/redux/bookings.reducer";


export default  function paymentHandler(booking,paymentCallback) {


console.log(booking)
    let paymentResponse ={

    }
    const options = {
        key: "rzp_test_pvJmuk3mYLgwDy",
        currency:"INR",
        amount: booking.totalAmount,
        name: "CampsitesIndia",
        description: "Booking "+booking.listingTile,
        // image: "http://localhost:1337/logo.png",
        order_id: booking.razorpayOrderId,
        // callback_url: 'http://localhost:8080/bookings/order/update',
        // redirect: true,

        handler:  (response) => {

            try {
                  paymentResponse = {
                    razorpayOrderId:response.razorpay_order_id,
                    razorpayPaymentId:response.razorpay_payment_id,
                    razorpaySignature:response.razorpay_signature,
                }
                console.log(paymentResponse)
                paymentCallback(paymentResponse)
               // dispatch(partialUpdateEntity(paymentResponse))
                //history.push("/pay-done/"+booking.id)

            } catch (err) {
                 paymentResponse = {
                    razorpayOrderId:response.razorpay_order_id,
                    razorpayPaymentId:response.razorpay_payment_id,
                    error:err
                }
                console.log(err);
            }

        },
        prefill: {
            name: "Campsites India",
            email: "email@campsitesindia.in",
            contact: "9999999999",
        },
        theme: {
            color: "#686CFD",
        },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();

};


