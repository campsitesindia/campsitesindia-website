import React, {FC, useEffect, useState} from "react";
import Input from "shared/Input/Input";
import Select from "shared/Select/Select";
import CommonLayout from "./CommonLayout";
import Geocode from "react-geocode";

import FormItem from "./FormItem";
import Textarea from "../../shared/Textarea/Textarea";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import {LocationMarkerIcon} from "@heroicons/react/solid";
import Label from "../../components/Label/Label";
import GoogleMapReact from "google-map-react";
import LocationMarker from "../../components/AnyReactComponent/LocationMarker";
import {useAppDispatch, useAppSelector} from "../../campsitesindia/config/store";
import {createEntity, getEntity, reset, updateEntity} from "../../campsitesindia/listing/redux/listing.reducer";
import {getEntities as getListingTypes} from "../../campsitesindia/listing-type/redux/listing-type.reducer";
import {getEntities as getLocations} from "../../campsitesindia/location/redux/location.reducer";
import {
    convertDateTimeFromServer,
    convertDateTimeToServer,
    displayDefaultDateTime
} from "../../campsitesindia/util/date-utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Translate from "react-jhipster/lib/src/language/translate";
import Button from "../../shared/Button/Button";
import {IListing} from "../../campsitesindia/listing/model/listing.model";
import {number} from "prop-types";
import DialogBox from "../../campsitesindia/util/components/DialogBox";
import AnyReactComponent from "../../components/AnyReactComponent/AnyReactComponent";

export interface PageAddListing1Props {
    isNew:boolean,
    listingId?:number;
    newUpdateListing:IListing;
    handleChange : (listingId: number) => void;
    handleEntityCreateUpdate:(isNew: boolean) => void;
    handleFormChanges:(value:IListing) => void

}

const PageAddListing1: FC<PageAddListing1Props> = ({isNew,listingId,handleChange,handleEntityCreateUpdate,newUpdateListing,handleFormChanges}) => {
    const [selectState, setSelectState] = useState<string>(
        "Himachal Pradesh",
    );

    const [address,setAddress] = useState('')
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] = useState(0)
    const [showMap,setShowMap] = useState(false)
    const [title,setTitle] = useState('')
    const [isFeatured,setIsFeatured] = useState(false)
    const [phone,setPhone] = useState('')
    const [email,setEmail] = useState('')
    const [website,setWebsite] = useState('')
    const [disableBooking,setDisableBooking] = useState('')
    const [listingTypeId,setListingTypeId] = useState(0)
    const [locationId,setLocationId] = useState(0)
    const [ownerId,setOwnerId] = useState('')
    const [pricePerPerson,setPricePerPerson] = useState(0)
    const [pricePerChild,setPricePerChild] = useState(0)
    const [discount,setDiscount] = useState(0)
    const [content,setContent] = useState('')
    const [isCreated,setIsCreated] = useState(false)
    const [buttonText,setButtonText] = useState("Save")
    const account = useAppSelector(state => state.authentication.account);


// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDxJaU8bLdx7sSJ8fcRdhYS1pLk8Jdvnx0");

// set response language. Defaults to english.
    Geocode.setLanguage("en");

// set response region. Its optional.
// A Geocoding request with region=es (Spain) will return the Spanish city.
    Geocode.setRegion("in");





    const [selectValue, setSelectValue] = useState<string>(
        "Camping",
    );

    const dispatch = useAppDispatch();
    const listingTypes = useAppSelector(state => state.listingType.entities);
    const locations = useAppSelector(state => state.location.entities);
    const locationLoading =useAppSelector(state => state.location.loading);
    const listingEntityDetails = useAppSelector(state => state.listingDetails.entity);
    const listingEntity  = useAppSelector(state => state.listing.entity);
    const loading = useAppSelector(state => state.listing.loading);
    const updating = useAppSelector(state => state.listing.updating);
    const updateSuccess = useAppSelector(state => state.listing.updateSuccess);



    const buttonHandler = () => {


        Geocode.fromAddress(address).then(

            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLatitude(lat);
                setLongitude(lng)
                console.log(lat, lng);
            },
            (error) => {
                console.error(error);
            }
        );

        setShowMap(true)
    };


    const saveEntity = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newListing:IListing={}
        newListing.title=title

        newListing.address=address

        newListing.listingType={id:Number(listingTypeId)}

        newListing.location={id:Number(locationId)}
        newListing.latitude=latitude
        newListing.longitude=longitude
        newListing.phone=phone
        newListing.email=email
        newListing.website=website
        newListing.pricePerPerson=pricePerPerson
        newListing.pricePerChild=pricePerChild
        newListing.discount=discount
        newListing.content=content
        newListing.owner={id:Number(account.id)}



        // newListing.createdDate = convertDateTimeToServer(displayDefaultDateTime()).toString();
        // newListing.updatedBy = convertDateTimeToServer(displayDefaultDateTime()).toString();
        // newListing.updateDate = convertDateTimeToServer(displayDefaultDateTime()).toString();


        if (!isCreated) {

          dispatch(createEntity(newListing));
          handleFormChanges(newListing)

        } else {
            console.log("update")
            newListing.id=listingId
             dispatch(updateEntity(newListing));
            handleFormChanges(newListing)
        }
        setIsCreated(true)
        setButtonText("Update")
    };

    useEffect(() => {
        console.log(account)
        if (isNew) {
            dispatch(reset());
        } else {
           // alert(listingId)
            dispatch(getEntity(listingId));
            setIsCreated(true)
        }

        dispatch(getListingTypes({}));
        dispatch(getLocations({}));

        if(newUpdateListing){

            setTitle(newUpdateListing.title)

            setAddress(newUpdateListing.address)
            setListingTypeId( newUpdateListing.listingType.id)

           setLocationId(newUpdateListing.location.id)
            setLatitude(newUpdateListing.latitude)
            setLongitude(newUpdateListing.longitude)
            setPhone(newUpdateListing.phone)
            setEmail(newUpdateListing.email)
            setWebsite(newUpdateListing.website)
            setPricePerPerson(newUpdateListing.pricePerPerson)
            setPricePerChild(newUpdateListing.pricePerChild)
            setDiscount(newUpdateListing.discount)
            setContent(newUpdateListing.content)
           setOwnerId(newUpdateListing.owner.id)

        }

    }, []);


    useEffect( () =>{
        if (isCreated && listingEntity!==undefined) {

            handleChange(listingEntity.id)
            handleEntityCreateUpdate(false)
        }

    },[listingEntity])
    useEffect(() => {

        if (isCreated && listingEntityDetails!==undefined && listingEntityDetails.listing!==undefined) {

            handleChange(listingEntityDetails.listing.id)
            handleEntityCreateUpdate(false)
            handleFormChanges(listingEntityDetails.listing)

        }
        if(newUpdateListing){

            setTitle(newUpdateListing.title)

            setAddress(newUpdateListing.address)
            setListingTypeId( newUpdateListing.listingType.id)

            setLocationId(newUpdateListing.location.id)
            setLatitude(newUpdateListing.latitude)
            setLongitude(newUpdateListing.longitude)
            setPhone(newUpdateListing.phone)
            setEmail(newUpdateListing.email)
            setWebsite(newUpdateListing.website)
            setPricePerPerson(newUpdateListing.pricePerPerson)
            setPricePerChild(newUpdateListing.pricePerChild)
            setDiscount(newUpdateListing.discount)
            setContent(newUpdateListing.content)
            setOwnerId(newUpdateListing.owner.id)

        }

    }, [listingEntityDetails]);


    return (
    <CommonLayout
      index="01"
      backtHref="/add-listing"
      nextHref="/add-listing-2"
    >
      <>
        <h2 className="text-2xl font-semibold">  What kind of place do you have?</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
          {updateSuccess? (

              <div>
                  <DialogBox mess={"Your property is  " +buttonText+"d  "+ listingId }/>
              <h2 className="text-2xl font-semibold">You property is added </h2>
              </div>

                  ):
              (null)
          }
        {/* FORM */}
          <form onSubmit={saveEntity} >
        <div className="space-y-8">
          {/* ITEM */}

          <FormItem
            label="What type of property is this?"
            desc="Camping:Home Stay: Experience "
          >
            <Select
                value={listingTypeId}
                disabled={isCreated}
                onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
                    console.log(ev.target.value)
                    //handleFormChanges("listingType",ev.target.value)
                    return setListingTypeId(Number(ev.target.value));
                }
                }

            >
                {listingTypes && listingTypes.map(listingType => {
                    return <option value={listingType.id}>{listingType.title}</option>
                })
                }

            </Select>


          </FormItem>
          <FormItem
            label="Place name"
            desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"

          >
            <Input placeholder="Places name"
                   value={title}
                   required
                  // disabled={isCreated}
                   onChange={(e) => {
                       // Get latitude & longitude from address.
                      // {handleFormChanges('title',e.target.value)}
                       setTitle(e.target.value);

                      // listingEntity.title=title
                   }}/>
          </FormItem>
            <>
                <h2 className="text-2xl font-semibold">Your place location</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* FORM */}
                <div className="space-y-8">

                    {/* ITEM */}
                    <FormItem label="Address">
                        <Input
                            value={address}
                           // disabled={isCreated}
                            required
                            onChange={(e) => {
                                // Get latitude & longitude from address.
                                setAddress(e.target.value);
                            }}
                        />
                    </FormItem>
                    <ButtonSecondary type={"button"}
                         onClick={buttonHandler}
                    >
                        <LocationMarkerIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                        <span className="ml-3">Click to plot location on the map</span>
                    </ButtonSecondary>

                    {/*<FormItem label="Adult - PricePerNight">*/}
                        {/*<Input placeholder="..." />*/}
                    {/*</FormItem>*/}


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
                        <FormItem label="Latitude">
                    <span
                        className="
      z-10
      h-full
      leading-snug
      font-normal
      absolute
      text-center text-gray-400
      absolute
      bg-transparent
      rounded
      text-base
      items-center
      justify-center
      w-8
      pl-2
      py-1
    "
                    >
                 <i className="las la-2x la-arrow-down"></i>
  </span>
                            <Input type="text"

                                   className="
      px-2
      py-1
      placeholder-gray-400
      text-gray-600
      relative
      bg-white bg-white
      rounded
      text-sm
      border border-gray-400
      outline-none
      focus:outline-none focus:ring
      w-full
      pl-10
    "
                                   value={latitude}
                                   defaultValue={latitude}
                                   readOnly
                                  // onChange={(e) => setLatitude(e.target.value)}

                            />
                        </FormItem>
                        <FormItem label="Longitude">
                    <span
                        className="
      z-10
      h-full
      leading-snug
      font-normal
      absolute
      text-center text-gray-400
      absolute
      bg-transparent
      rounded
      text-base
      items-center
      justify-center
      w-8
      pl-2
      py-1
    "
                    >
                 <i className="las la-2x la-arrow-right"></i>
  </span>
                            <Input type="text"

                                   className="
      px-2
      py-1
      placeholder-gray-400
      text-gray-600
      relative
      bg-white bg-white
      rounded
      text-sm
      border border-gray-400
      outline-none
      focus:outline-none focus:ring
      w-full
      pl-10
    "                             readOnly
                                   required
                                   value={longitude}
                                  // onChange={(e) => setLongitude(e.target.value)}
                            />
                        </FormItem>


                    </div>
                    <FormItem label="State">
                        <Select name="location" id="location"

                                value={locationId}
                                onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => {
                                    return setLocationId(Number(ev.target.value));
                                }
                                }
                        > {locations && locations.map(location => {
                            return <option value={location.id}>{location.title}</option>
                        })
                        }
                        </Select>
                    </FormItem>
                    <div>
                        <Label>Detailed address</Label>
                        <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                            {address}
            </span>
                        {showMap && latitude ? (
                            <div className="mt-4">
                                latitude: {latitude}
                                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3">
                                    <div className="rounded-xl overflow-hidden">
                                        <div style={{ height: '100vh', width: '100%' }}>
                                        <GoogleMapReact
                                            bootstrapURLKeys={{
                                                key: "AIzaSyDxJaU8bLdx7sSJ8fcRdhYS1pLk8Jdvnx0",
                                            }}
                                            defaultZoom={15}
                                            yesIWantToUseGoogleMapApiInternals
                                            defaultCenter={{
                                                lat: 27.1766701,
                                                lng: 78.00807449999999,
                                            }}
                                            center={{
                                                lat: latitude,
                                                lng: longitude,
                                            }}
                                        >
                                            <AnyReactComponent
                                                lat={latitude}
                                                lng={longitude}

                                            />

                                        </GoogleMapReact>
                                        </div>
                                    </div>
                                </div>
                            </div>):(null)
                        }
                    </div>
                </div>
            </>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">

                <FormItem label="Phone">
                    <span
                        className="
      z-10
      h-full
      leading-snug
      font-normal
      absolute
      text-center text-gray-400
      absolute
      bg-transparent
      rounded
      text-base
      items-center
      justify-center
      w-8
      pl-2
      py-1
    "
                    >
                 <i className="las la-2x la-phone"></i>
  </span>
                    <Input type="text"

                           className="
      px-2
      py-1
      placeholder-gray-400
      text-gray-600
      relative
      bg-white bg-white
      rounded
      text-sm
      border border-gray-400
      outline-none
      focus:outline-none focus:ring
      w-full
      pl-10
    "
                           value={phone}
                           required
                          // disabled={isCreated}
                           onChange={(e) => setPhone(e.target.value)}
                    />
                </FormItem>
                <FormItem label="Email">
                    <span
                        className="
      z-10
      h-full
      leading-snug
      font-normal
      absolute
      text-center text-gray-400
      absolute
      bg-transparent
      rounded
      text-base
      items-center
      justify-center
      w-8
      pl-2
      py-1
    "
                    >
                 <i className="las la-2x la-envelope"></i>
  </span>
                    <Input type="text"

                           className="
      px-2
      py-1
      placeholder-gray-400
      text-gray-600
      relative
      bg-white bg-white
      rounded
      text-sm
      border border-gray-400
      outline-none
      focus:outline-none focus:ring
      w-full
      pl-10
    "                       required
                           value={email}
                           //disabled={isCreated}
                           onChange={(e) => setEmail(e.target.value)}/>
                </FormItem>
                <FormItem label="Website">
                   <span
                       className="
      z-10
      h-full
      leading-snug
      font-normal
      absolute
      text-center text-gray-400
      absolute
      bg-transparent
      rounded
      text-base
      items-center
      justify-center
      w-8
      pl-2
      py-1
    "
                   >
                 <i className="las la-2x la-globe-asia"></i>
  </span>
                    <Input type="text"

                           className="
      px-2
      py-1
      placeholder-gray-400
      text-gray-600
      relative
      bg-white bg-white
      rounded
      text-sm
      border border-gray-400
      outline-none
      focus:outline-none focus:ring
      w-full
      pl-10
    "                      required
                           value={website}
                           //disabled={isCreated}
                           onChange={(e) => setWebsite(e.target.value)}
                    />
                </FormItem>
            </div>
            <div>
            <h2 className="text-2xl font-semibold">
                Set up a <strong>price</strong> for your space
            </h2>
            <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
           Use any discount you would like run
          </span>
        </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
                <FormItem label="Adult- Price Per Night">
                    <Input
                        required
                        value={pricePerPerson}
                        placeholder="0.00"
                        //disabled={isCreated}
                        onChange={(e) => setPricePerPerson(Number(e.target.value))}
                    />
                </FormItem>
                <FormItem label="Children - Price Per Night">
                    <Input required
                           value={pricePerChild}
                           placeholder="0.00"
                           onChange={(e) => setPricePerChild(Number(e.target.value))} />
                </FormItem>
                <FormItem label="Discount in %">
                    <Input required
                           value={discount}
                           placeholder="0.00"
                           //disabled={isCreated}
                           onChange={(e) => setDiscount(Number(e.target.value))} />
                </FormItem>
            </div>
            <div>
                <h2 className="text-2xl font-semibold">
                    Your place description for client
                </h2>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Mention the best features of your accommodation, any special
            amenities like fast Wi-Fi or parking, as well as things you like
            about the neighborhood.
          </span>
            </div>

            <Textarea placeholder="..." rows={14}
                      value={content}
                      required
                      //disabled={isCreated}
                      onChange={(e) => setContent(e.target.value)}

            />

        </div>

              <FormItem  >
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
                          {buttonText}
                      </button>
              </FormItem>

              {/*<Button      type="submit" disabled={isCreated}>*/}

              {/*</Button>*/}
              </form>
      </>
    </CommonLayout>
  );
};

export default PageAddListing1;
