import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import locale from './locale';
import authentication from './authentication';
import location from 'campsitesindia/location/redux/location.reducer';
import room from 'campsitesindia/room/redux/room.reducer';
import features from 'campsitesindia/features/redux/features.reducer';
import listing from 'campsitesindia/listing/redux/listing.reducer';
import listingDetails from 'campsitesindia/listing/redux/listingdetails.reducer';
import photos from 'campsitesindia/photos/redux/photos.reducer';

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

  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
