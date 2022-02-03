import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';

import {cleanEntity} from '../../util/entity-utils';
import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'shared/reducers/reducer.utils';

import {defaultValue, IListingPublish} from "../model/listing-publish.model";

const initialState: EntityState<IListingPublish> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};



const apiUrl = 'api/listings/publish';

// Actions



export const setToPublish = createAsyncThunk(
  'listing/partial_update_entity',
  async (listingId: number, thunkAPI) => {
    const result = await axios.put<IListingPublish>(`${apiUrl}/${listingId}`);

    return result;
  },
  { serializeError: serializeAxiosError }
);
// slice

export const ListingPublishSlice = createEntitySlice({
  name: 'listingPublish',
  initialState,
  extraReducers(builder) {
    builder

      .addMatcher(isFulfilled(setToPublish), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending( setToPublish), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});



export const { reset } = ListingPublishSlice.actions;

// Reducer
export default ListingPublishSlice.reducer;

