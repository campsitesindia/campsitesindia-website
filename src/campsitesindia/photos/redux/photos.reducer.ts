import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';

import {cleanEntity} from '../../util/entity-utils';
import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'shared/reducers/reducer.utils';
import {defaultValue, IPhotos} from '../model/photos.model';

const initialState: EntityState<IPhotos> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

const apiUrl = 'api/photos';

// Actions

export const getEntities = createAsyncThunk('photos/fetch_entity_list', async ({query }: IQueryParams) => {
  const requestUrl = `${apiUrl}?${query}`;
  return axios.get<IPhotos[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'photos/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IPhotos>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getPhotosByListing = createAsyncThunk('photos/fetch_entity_list_by_listing',
    async (id: string | number) => {
       // photos?id.equals=1
        const requestUrl = `${apiUrl}?listingId.equals=${id}`;
        const result = await axios.get<IPhotos[]>(requestUrl);
        return result;
    });

export const createEntity = createAsyncThunk(
  'photos/create_entity',
  async (entity: IPhotos, thunkAPI) => {
    const result = await axios.post<IPhotos>(apiUrl, cleanEntity(entity));
   thunkAPI.dispatch(getPhotosByListing(entity.listing.id));
    return result;
  },
  { serializeError: serializeAxiosError }
);



export const updateEntity = createAsyncThunk(
  'photos/update_entity',
  async (entity: IPhotos, thunkAPI) => {
    const result = await axios.put<IPhotos>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'photos/partial_update_entity',
  async (entity: IPhotos, thunkAPI) => {
    const result = await axios.patch<IPhotos>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'photos/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IPhotos>(requestUrl);
       //thunkAPI.dispatch(getPhotosByListing(entity.listing.id));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const PhotosSlice = createEntitySlice({
  name: 'photos',
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
        .addMatcher(isFulfilled(getPhotosByListing), (state, action) => {
            //console.log(action.payload.data)
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
        .addMatcher(isPending(getPhotosByListing, getEntity), state => {
            state.errorMessage = null;
            state.updateSuccess = false;
            state.loading = true;
        })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })

  },
});

export const { reset } = PhotosSlice.actions;

// Reducer
export default PhotosSlice.reducer;
