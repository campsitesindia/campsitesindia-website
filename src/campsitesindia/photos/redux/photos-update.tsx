import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import { IListing } from '../../listing/model/listing.model';
import { getEntity, updateEntity, createEntity, reset } from './photos.reducer';
import { IPhotos } from '../model/photos.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from '../../util/date-utils';
import { mapIdList } from '../../util/entity-utils';
import { useAppDispatch, useAppSelector } from '../../config/store';
import NcImage from "../../../shared/NcImage/NcImage";
import {Simulate} from "react-dom/test-utils";


export const PhotosUpdate = (props: RouteComponentProps<{ listingId:string,id:string,new:string }>) => {
  const dispatch = useAppDispatch();

  const [listingId] = useState(props.match.params.listingId );


  const photosEntity = useAppSelector(state => state.photos.entity);
  const loading = useAppSelector(state => state.photos.loading);
  const updating = useAppSelector(state => state.photos.updating);
  const updateSuccess = useAppSelector(state => state.photos.updateSuccess);
    const [coverImg, setCoverImg] = useState<File>();
    const [coverImgFile, setCoverImgFile] = useState(undefined);
    const [caption, setCaption] = useState('');
    const [isCoverImage, setIsCoverImage] = useState(false);


    const handleCoverImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (!fileList) return;
        setCoverImg(fileList[0])
        setCoverImgFile(URL.createObjectURL(fileList[0]));

    };

  const handleClose = () => {
    props.history.push('/photos');
  };

  useEffect(() => {
          dispatch(getEntity(props.match.params.id));

  }, []);

    useEffect(() => {
        if(!loading){
            setCoverImgFile('data:'+photosEntity.imageContentType+';base64,'+photosEntity.image)
            setIsCoverImage(photosEntity.isCoverImage)

        }
    }, [loading]);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.taken = convertDateTimeToServer(values.taken);
    values.uploaded = convertDateTimeToServer(values.uploaded);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.updatedBy = convertDateTimeToServer(values.updatedBy);
    values.updateDate = convertDateTimeToServer(values.updateDate);

    const entity = {
      ...photosEntity,
      ...values,
      tags: mapIdList(values.tags),
        taken: convertDateTimeFromServer(photosEntity.taken),
        uploaded: convertDateTimeFromServer(photosEntity.uploaded),
        createdDate: convertDateTimeFromServer(photosEntity.createdDate),
        updatedBy: convertDateTimeFromServer(photosEntity.updatedBy),
        updateDate: convertDateTimeFromServer(photosEntity.updateDate),
        albumId: photosEntity?.album?.id,
        listingId: photosEntity?.listing?.id,

    };



      dispatch(updateEntity(entity));

  };





  return (
      <div className={`nc-PayPage  `} data-nc-id="PayPage">
          {loading ? (
              <p>Loading...</p>
          ) : (
          <main className="container mt-11 mb-24 lg:mb-32 ">
              <div className="max-w-4xl mx-auto">
                  <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">

                      <div className="flex justify-center flex-row">
                          <i className="las la-3x la-image" />
                          <span className="mt-1.5 text-lg font-semibold"><h2 className="text-3xl lg:text-4xl font-semibold">
                      Add New Image
                </h2></span>
                      </div>
                      <form >
                      <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
                      <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                          <div className="flex-1 p-5 flex space-x-4">
                              {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                              <div className="flex flex-col">
                                       <label
                                          className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-800 hover:text-white">
                                          <svg className="w-8 h-8" fill="currentColor"
                                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                              <path
                                                  d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                                          </svg>
                                          <span className="mt-2 text-base leading-normal">Select a file</span>
                                          <input type='file' className="hidden"
                                                 onChange={handleCoverImageChange}
                                          />
                                      </label>


                              </div>
                          </div>
                          <div className="flex-1 p-5 flex space-x-4">
                              {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                              <div className="flex flex-col">
                                  <NcImage

                                      className="object-cover w-25 h-25 rounded-md sm:rounded-xl"
                                      src={coverImgFile}
                                      prevImageHorizontal
                                  />
                              </div>
                          </div>
                      </div>
                          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                              <div className="flex-1 p-5 flex space-x-4">
                                  {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                                  <div className="flex flex-col">
                                      <span className="text-sm text-neutral-400">IsCoverImage</span>
                                      <input
                                          type="checkbox"
                                          className=" w-full p-3 rounded mb-4"
                                          required
                                          name="isCoverImage"
                                           checked={photosEntity.isCoverImage}
                                          // onChange={(e) => setFirstName(e.target.value)}
                                      />
                                  </div>
                              </div>
                              <div className="flex-1 p-5 flex space-x-4">
                                  {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                                  <div className="flex flex-col">
                                      <span className="text-sm text-neutral-400">Caption</span>
                                      <input
                                          type="text"
                                          className=" w-full p-3 rounded mb-4"
                                          required
                                          name="caption"
                                          value={photosEntity.caption}
                                          // onChange={(e) => setLastName(e.target.value)}
                                      />
                                  </div>
                              </div>
                          </div>


                          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                          <div className="flex-1 p-5 flex space-x-4">
                              {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                              <div className="flex flex-col">
                                  <button
                                      className=" rounded bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                      type="button">
                                      <i className="las la-3x la-edit"></i>Edit
                                  </button>

                              </div>
                          </div>
                          <div className="flex-1 p-5 flex space-x-4">
                              {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                              <div className="flex flex-col">
                                  <button
                                      className="rounded bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                      type="button">
                                      <i className="las la-3x la-cut">Delete</i>
                                  </button>

                              </div>
                          </div>
                      </div>
                      </form>



                  </div>


              </div>

          </main>
              )}
      </div>
  );
};

export default PhotosUpdate;
