import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import location from 'campsitesindia/location/redux/location.reducer';
import room from 'campsitesindia/room/redux/room.reducer';
import features from 'campsitesindia/features/redux/features.reducer';
import listing from 'campsitesindia/listing/redux/listing.reducer';
import listingDetails from 'campsitesindia/listing/redux/listingdetails.reducer';
import photos from 'campsitesindia/photos/redux/photos.reducer';
import photosupload from 'campsitesindia/photos/redux/photosupload.reducer';

import authenticatedUser from 'campsitesindia/authenticated-user/redux/authenticated-user.reducer'
import register from  'campsitesindia/account/register/register.reducer'
import listingType from 'campsitesindia/listing-type/redux/listing-type.reducer'
import featuresByListing from 'campsitesindia/features/redux/featuresByListing.reducer'
import featuresListing from 'campsitesindia/features-listing/redux/features-listing.reducer'
import bookings from 'campsitesindia/booking/redux/bookings.reducer'
import listingPublish from 'campsitesindia/listing/redux/listing.publish.reducer'
import settings from 'campsitesindia/account/settings/settings.reducer'
import bookingcart from 'campsitesindia/booking/bookingcart/bookingcart.reducer'

/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  locale,
    location,
    room,
    features,
    listing,
    listingDetails,
    photos,
    authenticatedUser,
    register,
    listingType,
    photosupload,
    featuresByListing,
    featuresListing,
    bookings,
    listingPublish,
    settings,
    bookingcart,



  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
