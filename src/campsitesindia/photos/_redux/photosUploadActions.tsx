import {callTypes, photosUploadSlice} from "./photosUploadSlice";
import * as requestFromServer from "./photosUploadApi";

const {actions} = photosUploadSlice;


export const uploadPhotos= (photos) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
      .uploadPhotos(photos)
    .then(response => {
      const  uploadPhotoResponse  = response.data;
      dispatch(actions.photsUpload({ uploadPhotoResponse: uploadPhotoResponse} ));
    })
    .catch(error => {
      error.clientMessage = "Error";
      console.log('playerProfile error....'+error)
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};


