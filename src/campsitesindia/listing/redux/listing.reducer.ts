import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';

import {cleanEntity} from '../../util/entity-utils';
import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'shared/reducers/reducer.utils';
import {defaultValue, IListing} from '../model/listing.model';

const initialState: EntityState<IListing> = {
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

export const getEntities = createAsyncThunk('listing/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
    const requestUrl = `${'/api/listingsWithExtraInformation'}`
    const result= await axios.get<IListing[]>(requestUrl);
  return result
});

export const getEntity = createAsyncThunk(
  'listing/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/details/${id}`;
    return axios.get<IListing>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'listing/create_entity',
  async (entity: IListing, thunkAPI) => {
    const result = await axios.post<IListing>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'listing/update_entity',
  async (entity: IListing, thunkAPI) => {
    const result = await axios.put<IListing>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'listing/partial_update_entity',
  async (entity: IListing, thunkAPI) => {
    const result = await axios.patch<IListing>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'listing/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IListing>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const ListingSlice = createEntitySlice({
  name: 'listing',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
          totalItems: parseInt(action.payload.headers['x-total-count'], 10),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});



export const { reset } = ListingSlice.actions;

// Reducer
export default ListingSlice.reducer;

