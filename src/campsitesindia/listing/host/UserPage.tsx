import {Tab} from "@headlessui/react";
import CarCard from "components/CarCard/CarCard";
import CommentListing from "components/CommentListing/CommentListing";
import ExperiencesCard from "components/ExperiencesCard/ExperiencesCard";
import StartRating from "components/StartRating/StartRating";
import StayCard from "components/StayCard/StayCard";
import {DEMO_CAR_LISTINGS, DEMO_EXPERIENCES_LISTINGS, DEMO_STAY_LISTINGS,} from "data/listings";
import React, {FC, Fragment, useEffect, useState} from "react";
import Avatar from "shared/Avatar/Avatar";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import SocialsList from "shared/SocialsList/SocialsList";
import {Helmet} from "react-helmet";
import {RouteComponentProps} from "react-router";
import {useAppDispatch, useAppSelector} from "../../config/store";
import {overridePaginationStateWithQueryParams} from "../../util/entity-utils";
import {ITEMS_PER_PAGE} from "../../util/pagination.constants";
import {getSortState} from "react-jhipster";
import {getEntities} from "../redux/listing.reducer";
import {getRestrictedEntities} from "../redux/listingdetails.reducer";
import SettingsPage from "../../account/settings/settings";
import {emptyTaxonomyType, StayDataType} from "../../../data/types";

export interface AuthorPageProps {
    className?: string;
}

const UserPage: FC<AuthorPageProps> = ({ className = "" }) => {
  let [categories] = useState(["Stays", "Experiences", "Car for rent"]);

    //let data:StayDataType[]=[]
        const dispatch = useAppDispatch();

        const listingList = useAppSelector(state => state.listingDetails.entities) as any;
        const loading = useAppSelector(state => state.listingDetails.loading);
        const errorMessage = useAppSelector(state => state.listingDetails.errorMessage);
        const totalItems = useAppSelector(state => state.listingDetails.totalItems);
        const [data,setData] = useState<StayDataType[]>()
        const getAllEntities = () => {
            dispatch(
               getRestrictedEntities()
            );
        };


        useEffect(() => {
            getAllEntities()
        }, [loading]);

    useEffect(() => {
        setData(objectMap(listingList))
        if(data!=undefined){
            console.log("Data size is..."+data.length)
            }
    }, [loading]);


    function objectMap(listings) {

        console.log(listings)
        let cats :StayDataType[]=[]
        for (let [k, v] of Object.entries(listings)) {
            let newObj1 = listings[k]
            let photosList:string[]=[]


            newObj1.photosList.map((photo) => {
               // console.log(photo)
                let imageSource ='data:'+photo.imageContentType+';base64,'+photo.image
                photosList.push(imageSource)
            })

            let rating = 0
            if ( newObj1.ratings!==null){
                rating=newObj1.ratings.value;
            }
            //photosByListing(newObj1.id).then((value) => { photos= value})
             console.log("values listing:::..............."+listings[k].listingType)
            let stayData:StayDataType= {
                id: newObj1.listing.id,
                author: newObj1.listing.owner,
                date: newObj1.listing.createdDate,
                href: '/listing-stay-detail/'+newObj1.listing.id,
                title: newObj1.listing.title,
                featuredImage: newObj1.listing.thumbnail,
                commentCount: 10,
                viewCount: newObj1.listing.viewCount,
                address: newObj1.listing.address,
                reviewStart: rating,
                reviewCount: newObj1.reviews.length,
                like: false,
                galleryImgs:photosList,
                //galleryImgs: ['https://images.pexels.com/photos/5191371/pexels-photo-5191371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'], // from photos API
                // galleryImgs: photos,
                price: newObj1.listing.pricePerPerson,
                listingCategory: emptyTaxonomyType,
                maxGuests: 10,
                bedrooms: 2,
                bathrooms: 1,
                saleOff: null,
                isAds:  false,
                map: {
                    lat: newObj1.listing.latitude,
                    lng: newObj1.listing.longitude,
                },

            };
            cats.push(stayData)
            // console.log("listing::::::" + k + stayData.title+"   "+cats.length)
            // console.log(newObj1)

        }
        return cats;

    }

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
  const renderSection1 = () => {
    return (
        <>
        { loading ?
            (  errorMessage === null ? (

                    loadingBlock()

                ) :
                (errorBlock())


            )
            :
            (
                <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Kevin Francis's listings</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Kevin Francis's listings is very rich, 5 star reviews help him to be
            more branded.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        <div>
          <Tab.Group>
            <Tab.List className="flex space-x-1 overflow-x-auto">
              {categories.map((item) => (
                <Tab key={item} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {data.filter((_, i) => i < 50).map((stay) => (
                     <>
                    <StayCard key={stay.id} data={stay} />
                     </>
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_EXPERIENCES_LISTINGS.filter((_, i) => i < 4).map(
                    (stay) => (
                      <ExperiencesCard key={stay.id} data={stay} />
                    )
                  )}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {DEMO_CAR_LISTINGS.filter((_, i) => i < 4).map((stay) => (
                    <CarCard key={stay.id} data={stay} />
                  ))}
                </div>
                <div className="flex mt-11 justify-center items-center">
                  <ButtonSecondary>Show me more</ButtonSecondary>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
            )
        }
         </>
        );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing hasListingTitle className="pb-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <CommentListing hasListingTitle className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className={`nc-AuthorPage ${className}`} data-nc-id="AuthorPage">
      <Helmet>
        <title>Login || Booking React Template</title>
      </Helmet>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24"><SettingsPage/></div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
          {renderSection2()}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
