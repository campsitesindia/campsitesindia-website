import React, {FC, useEffect, useState} from "react";
import Checkbox from "shared/Checkbox/Checkbox";
import CommonLayout from "./CommonLayout";
import {useAppDispatch, useAppSelector} from "../../campsitesindia/config/store";
import {getEntities} from "../../campsitesindia/features/redux/features.reducer";
import {IListingDetails} from "../../campsitesindia/listing/model/listingDetails.model";
import {getAccount} from "../../shared/reducers/authentication";
import {getFeaturesByListing} from "../../campsitesindia/features/redux/featuresByListing.reducer";
import {defaultValue, IFeatures} from "../../campsitesindia/features/model/features.model";
import {createEntity} from "../../campsitesindia/features-listing/redux/features-listing.reducer";
import {IListing} from "../../campsitesindia/listing/model/listing.model";
import {IFeaturesListing} from "../../campsitesindia/features-listing/model/features-listing.model";
import FormItem from "./FormItem";

export interface PageAddListing4Props {
  listingId?:number ;
}

const PageAddListing4: FC<PageAddListing4Props> = ({listingId}) => {
    const dispatch = useAppDispatch();
    const features = useAppSelector(state => state.features.entities);
    const featuresByListing = useAppSelector(state => state.featuresByListing.entities);

    const loading = useAppSelector(state => state.features.loading);
    const totalItems = useAppSelector(state => state.features.totalItems);
    const [checkedState, setCheckedState] = useState(undefined);


   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();

       if(checkedState) {
           checkedState.map((item) => {
               if (item!==undefined && item.features!==undefined && item.value) {
                   let feature: IFeatures = {}
                   let listing: IListing = {}
                   feature.id = item.features.id
                   listing.id = listingId
                   let featureListing: IFeaturesListing = {}
                   featureListing.feature = feature;
                   featureListing.listing = listing
                   dispatch(createEntity(featureListing));
               }
           })
       }


   }
    const getAllEntities = () => {

        dispatch(
            getEntities({
                page: 1,
                size: 200,
            })
        );
    };



    const handleOnChange = (position) => {
        let markers = [ ...checkedState ];

        markers[position] = {id:checkedState[position].id,features:checkedState[position].features,value:!checkedState[position].value};
        setCheckedState(markers);
        //setIsChecked(!isChecked)


    };
    useEffect(() => {


        if(listingId!=0)
        {
            // alert(listingId)
            dispatch(getFeaturesByListing(listingId))

        }

        getAllEntities();

    }, [listingId]);

    useEffect(() => {

        let list = []
        features.map((item)=>{
            let isPresent=false;
            if(featuresByListing!==undefined && featuresByListing.length >=0)
            {


                    featuresByListing.map((fl:{title, id}) => {

                        if(fl.id===item.id){
                            isPresent=true;
                        }
                    })





            }

            list.push({id:item.id,features:item,value:isPresent})

        })

        setCheckedState(list)


    },[features])


  return (
    <CommonLayout
      index="04"
      backtHref="/add-listing-3"
      nextHref="/add-listing-5"
    >
      <>

        <div>
          <h2 className="text-2xl font-semibold">Amenities {listingId} </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Many customers have searched for accommodation based on amenities
            criteria {featuresByListing ? (featuresByListing.length + '   total features ' +features.length):(features.length)}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-8">
          {/* ITEM */}
          <div>
            <label className="text-lg font-semibold" htmlFor="">
              General amenities
            </label>


                <form onSubmit={handleSubmit}>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {checkedState!==undefined && checkedState.length > 0 ? (features.map(({ title, id }, index) => {

                    return(<div className="flex flex-row gap-x-2">

                        <input
                            type="checkbox"
                            id={`custom-checkbox-${index}`}
                            name={title}
                            value={title}
                           checked={checkedState[index].value}
                            onChange={() => handleOnChange(index)}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>{title}</label>

                        </div>
                    )
                    })):(null)
                }
                    {listingId ? (
                        <FormItem>
                            <button
                                className="
            mx-3
            bg-blue-800
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

            ease-linear
            transition-all
            duration-150
          "
                                type="submit"
                                //disabled={isCreated}

                            >
                                Save
                            </button>
                        </FormItem>
                    ) : (null)

                    }
                    </div>
                </form>

            </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing4;
