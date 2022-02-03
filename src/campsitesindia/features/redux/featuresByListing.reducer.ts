import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';

import {cleanEntity} from '../../util/entity-utils';
import {
    createEntitySlice,
    EntityState,
    IQueryParams,
    serializeAxiosError
} from 'shared/reducers/reducer.utils';
import {defaultValue, IFeatures} from '../model/features.model';

const initialState: EntityState<IFeatures> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/features';

export const getFeaturesByListing = createAsyncThunk('features/fetch_entity_list_by_listingID',
    async (id: string | number) => {
        console.log(id)
    const requestUrl = `${apiUrl}/listing/${id}`;
    console.log(requestUrl)
    return axios.get<IFeatures[]>(requestUrl);
});

// slice

export const FeaturesByListingSlice = createEntitySlice({
  name: 'featuresByListing',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getFeaturesByListing.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.data;
      })

      .addMatcher(isPending(getFeaturesByListing), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })

  },
});

export const { reset } = FeaturesByListingSlice.actions;

// Reducer
export default FeaturesByListingSlice.reducer;
