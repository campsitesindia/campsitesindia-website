import React, {FC, useEffect, useState} from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import {useAppDispatch, useAppSelector} from "../../campsitesindia/config/store";
import {useParams} from "react-router";
import {getEntity} from "../../campsitesindia/listing/redux/listingdetails.reducer";
import {IListingDetails} from "../../campsitesindia/listing/model/listingDetails.model";
import {IListing} from "../../campsitesindia/listing/model/listing.model";

export interface PageAddListing8Props {
    listingDetails?:any;
}

const PageAddListing8: FC<PageAddListing8Props> = ({listingDetails}) => {

    const [hasPhotos,setHasPhotos] = useState(false)
    const [hasFeatures,setHasFeatures] = useState(false)
    const [isPublishable,setIsPublishable] = useState(false)

    useEffect(() => {

        const  obj=listingDetails;
        if(obj ){

            if(obj.featuresList !==undefined && obj.featuresList.length>0){
                setHasFeatures(true)
            }
            if(obj.photosList!==undefined && obj.photosList.length>0)
            {
                setHasPhotos(true)
            }

        }
        if(hasPhotos && hasFeatures){
            setIsPublishable(true)
        }
        console.log(obj.featuresList )
    },[listingDetails]  );



    return (
    <CommonLayout
      index="08"
      backtHref="/add-listing-7"
      nextHref="/add-listing-9"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Publish your place</h2>

        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="flex flex-row space-x-8">
          {/* ITEM */}

          <div><h2>Photos</h2></div>
            <div  >
                <input
                type="checkbox"
                id="photos-check"
                name="photosCheck"
                checked={hasPhotos}
               disabled={true}
                />


            </div>


        </div>
          <div className="flex flex-row space-x-5">
              {/* ITEM */}

              <div><h2>Features</h2></div>
              <div  >
                  <input
                      type="checkbox"
                      id="features-check"
                      name="featuresCheck"
                      checked={hasFeatures}
                      disabled={true}
                  />


              </div>


          </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing8;
