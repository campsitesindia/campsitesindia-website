import StartRating from "components/StartRating/StartRating";
import React, {FC, useEffect} from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import NcImage from "shared/NcImage/NcImage";
import {useAppSelector} from "../config/store";
import {getEntity} from "./redux/bookings.reducer";

export interface PaymentDoneProps {
  className?: string;
}

const PaymentDone: FC<PaymentDoneProps> = ({ className = "" }) => {

    const booking = useAppSelector(state => state.bookings.entity)
    const loading = useAppSelector(state => state.bookings.loading)
    const errorMessage = useAppSelector(state => state.bookings.errorMessage)

    useEffect(() => {
        //dispatchEvent(getEntity())
        console.log(booking)

    },[loading]);

    const loadingBlock = () => {
        return (
            <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/>
                </svg>
                <p>Loading .........</p>
            </div>
        )
    }
    const errorBlock = () =>{
        return (

            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Holy smokes!</strong>
                <span className="block sm:inline">Something seriously bad happened.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 20 20"><title>Close</title><path
        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
            </div>
        )
    }
  const renderContent = () => {
    return (
        <>
            {loading ?
                (errorMessage === null ? (

                            loadingBlock()

                        ) :
                        (errorBlock())


                )
                :
                (
                    <div
                        className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
                        <h2 className="text-3xl lg:text-4xl font-semibold">
                            Congratulation 🎉
                        </h2>

                        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

                        {/* ------------------------ */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold">Your booking</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <div className="flex-shrink-0 w-full sm:w-40">
                                    <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                                        <NcImage
                                            src="https://images.pexels.com/photos/6373478/pexels-photo-6373478.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"/>
                                    </div>
                                </div>
                                <div className="pt-5  sm:pb-5 sm:px-5 space-y-3">
                                    <div>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                    {booking.listing.title}
                </span>
                                        <span className="text-base sm:text-lg font-medium mt-1 block">
                                            {booking.listing.address}
                </span>
                                    </div>
                                    <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
                2 beds · 2 baths
              </span>
                                    <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
                                    <StartRating/>
                                </div>
                            </div>
                            <div
                                className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                                <div className="flex-1 p-5 flex space-x-4">
                                    <svg
                                        className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9.33333 8.16667V3.5M18.6667 8.16667V3.5M8.16667 12.8333H19.8333M5.83333 24.5H22.1667C23.4553 24.5 24.5 23.4553 24.5 22.1667V8.16667C24.5 6.878 23.4553 5.83333 22.1667 5.83333H5.83333C4.54467 5.83333 3.5 6.878 3.5 8.16667V22.1667C3.5 23.4553 4.54467 24.5 5.83333 24.5Z"
                                            stroke="#D1D5DB"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <div className="flex flex-col">
                                        <span className="text-sm text-neutral-400">Date</span>
                                        <span className="mt-1.5 text-lg font-semibold">
                  {booking.checkInDate}
                </span>
                                    </div>
                                </div>
                                <div className="flex-1 p-5 flex space-x-4">
                                    <svg
                                        className="w-8 h-8 text-neutral-300 dark:text-neutral-6000"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M14 5.07987C14.8551 4.11105 16.1062 3.5 17.5 3.5C20.0773 3.5 22.1667 5.58934 22.1667 8.16667C22.1667 10.744 20.0773 12.8333 17.5 12.8333C16.1062 12.8333 14.8551 12.2223 14 11.2535M17.5 24.5H3.5V23.3333C3.5 19.4673 6.63401 16.3333 10.5 16.3333C14.366 16.3333 17.5 19.4673 17.5 23.3333V24.5ZM17.5 24.5H24.5V23.3333C24.5 19.4673 21.366 16.3333 17.5 16.3333C16.225 16.3333 15.0296 16.6742 14 17.2698M15.1667 8.16667C15.1667 10.744 13.0773 12.8333 10.5 12.8333C7.92267 12.8333 5.83333 10.744 5.83333 8.16667C5.83333 5.58934 7.92267 3.5 10.5 3.5C13.0773 3.5 15.1667 5.58934 15.1667 8.16667Z"
                                            stroke="#D1D5DB"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <div className="flex flex-col">
                                        <span className="text-sm text-neutral-400">Guests</span>
                                        <span className="mt-1.5 text-lg font-semibold">3 Guests</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ------------------------ */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold">Booking detail</h3>
                            <div className="flex flex-col space-y-4">
                                <div className="flex text-neutral-6000 dark:text-neutral-300">
                                    <span className="flex-1">Booking code</span>
                                    <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                                        {booking.razorpayOrderId}
              </span>
                                </div>
                                <div className="flex text-neutral-6000 dark:text-neutral-300">
                                    <span className="flex-1">Date</span>
                                    <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                12 Aug, 2021
              </span>
                                </div>
                                <div className="flex text-neutral-6000 dark:text-neutral-300">
                                    <span className="flex-1">Total</span>
                                    <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                                        {booking.totalAmount}
              </span>
                                </div>
                                <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                                    <span className="flex-1">Payment method</span>
                                    <span className="flex-1 font-medium text-neutral-900 dark:text-neutral-100">
                Credit card
              </span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ButtonPrimary href="/">Explore more stays</ButtonPrimary>
                        </div>
                    </div>
                )
            }
        </>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <main className="container mt-11 mb-24 lg:mb-32 ">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
};

export default PaymentDone;
