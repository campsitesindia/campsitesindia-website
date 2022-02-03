import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';


import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'shared/reducers/reducer.utils';


import {defaultValue,IListingDetails} from "../model/listingDetails.model";
import {IListing} from "../model/listing.model";



const initialState: EntityState<IListingDetails> = {
  loading: true,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};



const apiUrl = 'api/listings';
const restrictedApiUrl = 'api/restricted';

// Actions

export const getEntity = createAsyncThunk(
  'listing_details/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/details/${id}`;
    return axios.get<IListingDetails>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getRestrictedEntities = createAsyncThunk('listing_details_r/fetch_entity_list', async () => {
    const requestUrl = `${restrictedApiUrl}`+'/listingsWithExtraInformation'
    const result= await axios.get<IListingDetails[]>(requestUrl);
    return result
});





export const getRestrictedEntity = createAsyncThunk(
    'listing_details_r/fetch_entity',
    async (id: string | number) => {
        const requestUrl = `${restrictedApiUrl}/details/${id}`;
        return axios.get<IListingDetails>(requestUrl);
    },
    { serializeError: serializeAxiosError }
);




// slice

export const ListingDetailsSlice = createEntitySlice({
  name: 'listingDetails',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
        .addCase(getRestrictedEntity.fulfilled, (state, action) => {
            state.loading = false;
            state.entity = action.payload.data;
        })
        .addCase(getRestrictedEntity.rejected, (state, action) => {
            state.loading = true;
            state.errorMessage = action.error.message
        })

      .addMatcher(isPending(getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
        .addMatcher(isFulfilled(getRestrictedEntities), (state, action) => {
        return {
            ...state,
            loading: false,
            entities: action.payload.data,
            totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
    })

  },
});



export const { reset } = ListingDetailsSlice.actions;

// Reducer
export default ListingDetailsSlice.reducer;

