import React, {FC, useEffect, useRef, useState} from "react";
import PageAddListing4 from "../../../containers/PageAddListing1/PageAddListing4";
import PageAddListing1 from "../../../containers/PageAddListing1/PageAddListing1";
import PageAddListing7 from "../../../containers/PageAddListing1/PageAddListing7";
import PageAddListing8 from "../../../containers/PageAddListing1/PageAddListing8";
import {defaultValue, IListing} from "../model/listing.model";
import Photos from "../../photos/redux/photos";
import {Route, useParams} from "react-router";
import AddingPhotosForListing from "./AddingPhotosForListing";
import {useAppDispatch, useAppSelector} from "../../config/store";
import {getEntity} from "../redux/listingdetails.reducer";

import {setToPublish} from "../redux/listing.publish.reducer";
import DialogBox from "../../util/components/DialogBox";

export interface MultiStepFormProps {

}


const MultiStepForm: FC<MultiStepFormProps> = () => {

    const [page, setPage] = useState(1);
    const [listingId, setListingId] = useState(0);
    const [isNew, setIsNew] = useState(true);


    const [listing, setListing] = useState<IListing>()
    const[imgList,setImgList] = useState<string[]>([]) // To display photos
    const[imgListFiles,setImgListFiles] = useState<File[]>([]) //to upload phot0s

    const listingEntity = useAppSelector(state => state.listingDetails.entity) as any;
    const loading = useAppSelector(state => state.listingDetails.loading);
    const isPublished = useAppSelector(state => state.listingPublish.updateSuccess);
    const [hasPhotos,setHasPhotos] = useState(false)
    const [hasFeatures,setHasFeatures] = useState(false)
    const [extendListingObject,setExtendedListingObject] = useState<any>()
    const [isPublishable,setIsPublishable] = useState(false)

    const dispatch = useAppDispatch();







    function goNextPage() {

        if (page === 4) {
            return;
        }
        if(page == 3){
            dispatch(
                getEntity(listingId)
            );

        }
        setPage((page) => page + 1);
        //index=page.toString();
    }

    function goPrevPage() {
        if (page === 1) return;
        setPage((page) => page - 1);
        //index=page.toString();
    }

    useEffect(() => {
        if(listingId!==0 && page === 4) {

            dispatch(
                getEntity(listingId)
            );
        }
        console.log(listingEntity)



    }, [page]);

    useEffect(() => {
        const  obj=listingEntity;

        if(obj ){

            if(obj.featuresList !==undefined && obj.featuresList.length>0){

                setHasFeatures(true)
                setIsPublishable(true)
            }else{
                setIsPublishable(false)
            }
            if(obj.photosList!==undefined && obj.photosList.length>0)
            {
                setHasPhotos(true)
                setIsPublishable(true)
            }else{
                setIsPublishable(false)
            }

        }

        console.log(obj.featuresList )
    },[loading])



    // Handle fields change
   const  handleChange = (listingId:number):void => {
       setListingId(listingId)
    };

    // Handle fields change
    const  handleEntityCreateUpdate = (isCreated:boolean):void => {
        console.log(isCreated)

       setIsNew(isCreated)
    };


    // Handle fields change
    const handleFormChanges = (value) => {
        console.log(value)
                setListing(value)
        // setListing((prevValue) => {
        //     return { ...prevValue,value };
        // });
        console.log(listing)

    };

    const onFormDataUpdate = (imgs,files) => {
        console.log(imgs)
        console.log(imgListFiles)

        setImgList(imgs)
        setImgListFiles(files)


    };

    return (
        <div
            className={`nc-PageAddListing1 px-4 max-w-6xl mx-auto pb-24 pt-14 sm:py-8 lg:pb-32 dark:bg-neutral-900`}
            data-nc-id="PageAddListing1"
        >
            <div className="space-y-11">
                <div>
                    <span className="text-4xl font-semibold">{listingId}{page}</span>{" "}
                    <span className="text-lg text-neutral-500 dark:text-neutral-400">
            / 4
          </span>{" "}
                    {isPublished? (

                            <div>
                                <DialogBox mess={"Your property is  published  "+ listingEntity.listing.title }/>
                                <h2 className="text-2xl font-semibold">You property is added </h2>
                            </div>

                        ):
                        (null)
                    }
                    {/* --------------------- */}


                    {/* the progress bar goes here */}

                    <progress max="4" value={page}/>
                    <div className="p-5">
                        <div className="mx-4 p-4">
                            <div className="flex items-center">
                                {/*Step-1 transition start*/}
                                {page === 1 ? (
                                    <>
                                        <div className="flex items-center text-white relative">

                                            <div
                                                className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            bg-purple-500
            border-2 border-purple-500
          "
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="feather feather-edit">
                                                    <path
                                                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path
                                                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </div>


                                            <div
                                                className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-purple-500
          "
                                            >
                                                About Your Space
                                            </div>
                                        </div>
                                        <div
                                            className="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-purple-500
        "
                                        >

                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center text-gray-300 relative">

                                            <div
                                                className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2 border-gray-300
          "
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="feather feather-edit">
                                                    <path
                                                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                    <path
                                                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                </svg>
                                            </div>


                                            <div
                                                className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-gray-500
          "
                                            >
                                                About Your Space
                                            </div>
                                        </div>
                                        <div
                                            className="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-gray-300
        "
                                        >

                                        </div>
                                    </>
                                )}


                                {/*Step-1 transition End*/}
                                {/*Step-2 transition start*/}
                                {page === 2 ? (
                                    <>
                                        <div className="flex items-center text-white relative">
                                            <div
                                                className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            bg-purple-500
            border-2 border-purple-500
          "
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="feather feather-coffee">
                                                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                                    <line x1="6" y1="1" x2="6" y2="4"></line>
                                                    <line x1="10" y1="1" x2="10" y2="4"></line>
                                                    <line x1="14" y1="1" x2="14" y2="4"></line>
                                                </svg>
                                            </div>
                                            <div
                                                className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-purple-500
          "
                                            >
                                                Facilities
                                            </div>
                                        </div>
                                        <div
                                            className="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-purple-500
        "
                                        ></div>
                                    </>
                                ) : (<>
                                    <div className="flex items-center text-gray-500 relative">
                                        <div
                                            className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2 border-gray-300
          "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-coffee">
                                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                                <line x1="14" y1="1" x2="14" y2="4"></line>
                                            </svg>
                                        </div>
                                        <div
                                            className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-gray-500
          "
                                        >
                                            Facilities
                                        </div>
                                    </div>
                                    <div
                                        className="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-gray-300
        "
                                    ></div>
                                </>)}


                                {/*Step-2 transition End*/}
                                {/*Step-3 transition start*/}
                                {page === 3 ? (
                                        <>
                                            <div className="flex items-center text-white relative">
                                                <div
                                                    className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2
            bg-purple-500
            border-purple-500

          "
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         stroke-width="2"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="feather feather-camera">
                                                        <path
                                                            d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                        <circle cx="12" cy="13" r="4"></circle>
                                                    </svg>
                                                </div>
                                                <div
                                                    className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-purple-500
          "
                                                >
                                                    Set the scene
                                                </div>
                                            </div>
                                            <div
                                                className="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-purple-500
        "
                                            ></div>
                                        </>) :
                                    (
                                        <>
                                            <div className="flex items-center text-gray-300 relative">
                                                <div
                                                    className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2
            border-gray-300

          "
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         stroke-width="2"
                                                         stroke-linecap="round" stroke-linejoin="round"
                                                         className="feather feather-camera">
                                                        <path
                                                            d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                                                        <circle cx="12" cy="13" r="4"></circle>
                                                    </svg>
                                                </div>
                                                <div
                                                    className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-gray-300
          "
                                                >
                                                    Set the scene
                                                </div>
                                            </div>
                                            <div
                                                className="
          flex-auto
          border-t-2
          transition
          duration-500
          ease-in-out
          border-gray-300
        "
                                            ></div>
                                        </>

                                    )}


                                {/*Step-3 transition End*/}
                                {/*Step-3 transition start*/}
                                {page === 4 ? (
                                    <div className="flex items-center text-white relative">
                                        <div
                                            className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            bg-purple-500
            border-2 border-purple-500
          "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-dollar-sign">
                                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                            </svg>
                                        </div>
                                        <div
                                            className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-gray-500
          "
                                        >
                                            Price your Space
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center text-gray-500 relative">
                                        <div
                                            className="
            rounded-full
            transition
            duration-500
            ease-in-out
            h-12
            w-12
            py-3
            border-2 border-gray-300
          "
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                                 stroke-linecap="round" stroke-linejoin="round"
                                                 className="feather feather-dollar-sign">
                                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                            </svg>
                                        </div>
                                        <div
                                            className="
            absolute
            top-0
            -ml-10
            text-center
            mt-16
            w-32
            text-xs
            font-medium
            uppercase
            text-gray-500
          "
                                        >
                                            Publish Your Place
                                        </div>
                                    </div>
                                )}
                                {/*Step-2 transition End*/}
                            </div>
                        </div>


                    </div>


                    {/* the content goes here */}
                    <div>
                        {page === 1 && <PageAddListing1 isNew={isNew} listingId={listingId}
                                                        handleChange={handleChange}
                                                        handleEntityCreateUpdate={handleEntityCreateUpdate}
                                                        newUpdateListing={listing}
                                                         handleFormChanges={handleFormChanges}

                                    />}
                        {page === 2 && (
                            <PageAddListing4 listingId={listingId}/>
                        )}
                        {page === 3 && (
                            <AddingPhotosForListing
                                             listingId={listingId}


                            />
                        )}
                        {page === 4 && <PageAddListing8 listingDetails={listingEntity}/>

                        }
                    </div>

                </div>
            </div>

            <div className="mt-8 p-4">
                <div className="flex p-2 mt-4">
                    <button
                        className="
          bg-gray-200
          text-gray-800
          active:bg-purple-600
          font-bold
          uppercase
          text-sm
          px-6
          py-3
          rounded
          shadow
          hover:shadow-lg
          outline-none
          focus:outline-none
          mr-1
          mb-1
          ease-linear
          transition-all
          duration-150
        "
                        type="button"
                        onClick={goPrevPage}
                    >
                        Previous
                    </button>
                    <div className="flex-auto flex flex-row-reverse">
                        {page !== 4 ? (
                            <button
                                className="
            mx-3
            bg-purple-500
            text-white
            active:bg-purple-600
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            shadow
            hover:shadow-lg
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
                                type="button"
                                onClick={goNextPage}
                            >
                                Next
                            </button>
                        ) : (

                            <button
                                className="
            text-purple-500
            bg-transparent
            border border-solid border-purple-500

            active:bg-purple-600

            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          "
                                type="button"
                                disabled={!isPublishable}
                                onClick={() => {  setIsPublishable(false)
                                    dispatch(setToPublish(listingId))}}

                            >
                                Published
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

};
export default MultiStepForm;
