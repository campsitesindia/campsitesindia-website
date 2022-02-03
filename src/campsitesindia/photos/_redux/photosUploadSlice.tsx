import {createSlice} from "@reduxjs/toolkit";

import {defaultValue} from "../model/photosupload.model";


export const callTypes = {
  list: "list",
  action: "action"
};

const initialPhotosUpload = {

    listLoading: false,
    actionsLoading: false,
    entity: defaultValue,
    lastError: null,
    error:''
};

export const photosUploadSlice = createSlice({
  name: "photosUpload",
    initialState:initialPhotosUpload,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // uploadphotos
      photsUpload: (state, action) => {
      state.actionsLoading = true;
      console.log("Photos Profile Slice...."+ action.payload)
      state.entity = action.payload;
      state.error = null;

    },

  }
});

