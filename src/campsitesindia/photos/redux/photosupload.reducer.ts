import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending} from '@reduxjs/toolkit';
import * as FormData from 'form-data';
import { createReadStream, createWriteStream } from 'fs';
import {cleanEntity} from '../../util/entity-utils';
import {createEntitySlice, EntityState, IQueryParams, serializeAxiosError} from 'shared/reducers/reducer.utils';
import {defaultValue, IUpload} from '../model/photosupload.model';

const initialState: EntityState<IUpload> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,

};

// Actions



export const uploadPhotos = createAsyncThunk(

    'photos/upload',
    async (data: { files:FormData,location:string,listingName:string}

    ) => {


        const form = new FormData();
        const request = require('request');
        form.append("files", data.files[0])
        form.set("location",data.location)
        form.set("listingName",data.listingName)


        return axios({
            method: "post",
            url: 'api/upload',
            data: data.files,
            headers:data.files.getHeaders,
        });
    },

    { serializeError: serializeAxiosError }
);


// slice

export const PhotosUploadSlice = createEntitySlice({
  name: 'photosupload',
  initialState,
  extraReducers(builder) {
    builder

        .addMatcher(isFulfilled(uploadPhotos), (state, action) => {
            state.updating = false;
            state.loading = false;
            state.updateSuccess = true;
            state.entity = action.payload.data;
        })
    .addMatcher(isPending(uploadPhotos), state => {
        console.log(uploadPhotos)
          state.errorMessage = null;
          state.updateSuccess = false;
          state.updating = true;
      });
  },
});

export const { reset } = PhotosUploadSlice.actions;

// Reducer
export default PhotosUploadSlice.reducer;
