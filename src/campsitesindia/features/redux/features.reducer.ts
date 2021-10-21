import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';

import {cleanEntity} from '../../util/entity-utils';
import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'shared/reducers/reducer.utils';
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

// Actions

export const getEntities = createAsyncThunk('features/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}&` : '?'}cacheBuster=${new Date().getTime()}`;
  return axios.get<IFeatures[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
  'features/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IFeatures>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getFeaturesByListing = createAsyncThunk('features/fetch_entity_list',
    async (id: string | number) => {
    const requestUrl = `${apiUrl}/listing/${id}`;
    return axios.get<IFeatures[]>(requestUrl);
});


export const createEntity = createAsyncThunk(
  'features/create_entity',
  async (entity: IFeatures, thunkAPI) => {
    const result = await axios.post<IFeatures>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'features/update_entity',
  async (entity: IFeatures, thunkAPI) => {
    const result = await axios.put<IFeatures>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'features/partial_update_entity',
  async (entity: IFeatures, thunkAPI) => {
    const result = await axios.patch<IFeatures>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'features/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IFeatures>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const FeaturesSlice = createEntitySlice({
  name: 'features',
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
      .addMatcher(isPending(getEntities, getEntity,getFeaturesByListing), state => {
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

export const { reset } = FeaturesSlice.actions;

// Reducer
export default FeaturesSlice.reducer;
