
import {PencilAltIcon} from "@heroicons/react/outline";
import React, {FC, Fragment, useEffect, useState} from "react";
import NcImage from "shared/NcImage/NcImage";
import StartRating from "components/StartRating/StartRating";
import NcModal from "shared/NcModal/NcModal";
import paymentHandler from "../../campsitesindia/util/RazorPaymentGateway";
import moment from 'moment'
import {useAppDispatch, useAppSelector} from "../config/store";
import {convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime} from "../util/date-utils";
import {createEntity, partialUpdateEntity} from "../booking/redux/bookings.reducer";
import {useHistory} from "react-router";
import {processRazorPaymentForBooking} from "./bookingcart/bookingcart.reducer";



export interface BookingCheckOutPageProps {
        className?: string;
    }

const BookingCheckOutPage: FC<BookingCheckOutPageProps> = ({ className = "" }) => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };
    const bookingForm = useAppSelector(state => state.bookingcart)
    const bookingsEntity = useAppSelector(state => state.bookings.entity);
    const errorMessage = useAppSelector(state => state.bookings.errorMessage);
    const updateSuccess = useAppSelector(state => state.bookings.updateSuccess);
    const loading = useAppSelector(state => state.bookings.loading);
    const [isOrderCreated,setIsOrderCreated] = useState(false)
    const [razorPaymentResponse,setRazorPaymentResponse] = useState({
        razorpayOrderId:'',
        razorpayPaymentId:'',
        razorpaySignature:'',
        error:"No Error",
    })

   const paymentCallback= function callBackPaymentSuccess(response){
        setRazorPaymentResponse(response)
    }

    useEffect(() => {

        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    });

    const saveEntity = bookingForm => {
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
            dispatch(createEntity(newBooking));


    };

    useEffect(()=>{

        if(!loading  && updateSuccess && !isOrderCreated ){
            console.log(bookingsEntity)//setRazorPaymentResponse(paymentHandler(bookingsEntity));
           paymentHandler(bookingsEntity,paymentCallback)


        }


    },[loading,updateSuccess])

    useEffect(()=>{
        if(!loading  && updateSuccess && isOrderCreated){
            history.push("/pay-done/"+bookingsEntity.id)
        }

    },[loading,updateSuccess,isOrderCreated])

    useEffect(()=>{
        console.log(razorPaymentResponse)
        if(razorPaymentResponse!=undefined && razorPaymentResponse.razorpayPaymentId!=undefined ){
            if(razorPaymentResponse.error==null){
                let updateBookingForPayDone= {
                    razorPaymentResponse:razorPaymentResponse,
                    booking:bookingsEntity
                }
                //dispatch(processRazorPaymentForBooking(razorPaymentResponse))
                dispatch(partialUpdateEntity({
                    razorpayOrderId:razorPaymentResponse.razorpayOrderId,
                    razorpayPaymentId:razorPaymentResponse.razorpayPaymentId,
                    razorpaySignature:razorPaymentResponse.razorpaySignature
                }))
                setIsOrderCreated(true)
               // history.push("/pay-done")
            }
        }
    },[razorPaymentResponse])





  const renderSidebar = () => {
    return (
        <>
        { bookingForm.bookingcart ? (

                    <div
                        className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex-shrink-0 w-full sm:w-40">
                                <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                                    <NcImage
                                        src={bookingForm.bookingcart.imageSrc} />
                                </div>
                            </div>
                            <div className="py-5 sm:px-5 space-y-3">
                                <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">

                  {bookingForm.bookingcart.listingTile}

              </span>
                                    <span className="text-base font-medium mt-1 block">

              </span>
                                </div>
                                <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              2 beds · 2 baths
            </span>
                                <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                                <StartRating/>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <h3 className="text-2xl font-semibold">Price details</h3>
                            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                <span>Price for {bookingForm.bookingcart.guestAdults} Adults and Days {bookingForm.bookingcart.numberOfDays}</span>
                                <span>
                                    {bookingForm.bookingcart.totalAmountAdults}
                                </span>
                            </div>
                            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                <span>Price for {bookingForm.bookingcart.guestChildren} Children and Days {bookingForm.bookingcart.numberOfDays}</span>
                                <span>
                                    {bookingForm.bookingcart.totalAmountChildren}
                                 </span>
                            </div>
                            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                <span>Service charge</span>
                                <span>$0</span>
                            </div>

                            <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>{bookingForm.bookingcart.totalAmount}</span>
                            </div>
                        </div>
                    </div>

                ) :
                ( <div>loading.....</div>)
        }
        </>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">
          Confirm and payment
        </h2>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
            <div className="flex-1 p-5 flex justify-between space-x-5">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">
                    {/*{bookingDates}*/}
                   StartDate:  {bookingForm.bookingcart.startDate}



                </span>
                  <span className="mt-1.5 text-lg font-semibold">EndDate: {bookingForm.bookingcart.endDate}</span>
              </div>
              <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
            </div>
            <div className="flex-1 p-5 flex justify-between space-x-5">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">Adults: {bookingForm.bookingcart.guestAdults}</span>
                  <span className="mt-1.5 text-lg font-semibold">Children: {bookingForm.bookingcart.guestChildren}</span>
              </div>
              <PencilAltIcon className="w-6 h-6 text-neutral-300 dark:text-neutral-6000" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold">Pay with</h3>
          <div className="mt-6">
              <button
                  className={"px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full focus:outline-none bg-neutral-800 text-white"

                  }
                  type={"button"}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                      saveEntity(bookingForm.bookingcart)
                     // displayRazorpay(bookingForm.bookingcart)
                  }}
                  // onClick={displayRazorpay(bookingForm.bookingcart)}
              >
                  RazorPay
              </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPage ''`} data-nc-id="CheckOutPage">
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default BookingCheckOutPage;
