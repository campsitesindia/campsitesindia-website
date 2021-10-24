import axios from 'axios';
import {createAsyncThunk, isPending} from '@reduxjs/toolkit';


import {createEntitySlice, EntityState, serializeAxiosError} from 'shared/reducers/reducer.utils';
import {defaultValue, IListingDetails} from '../model/listingDetails.model';

const initialState: EntityState<IListingDetails> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};



const apiUrl = 'api/listings';

// Actions

export const getEntity = createAsyncThunk(
  'listing/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/details/${id}`;
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

      .addMatcher(isPending(getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })

  },
});



export const { reset } = ListingDetailsSlice.actions;

// Reducer
export default ListingDetailsSlice.reducer;

