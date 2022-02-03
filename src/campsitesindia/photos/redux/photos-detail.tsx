import React, {useEffect} from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Row} from 'reactstrap';
import {TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getEntity} from './photos.reducer';
import {APP_DATE_FORMAT} from '../../config/constants';
import {useAppDispatch, useAppSelector} from '../../config/store';
import NcImage from "../../../shared/NcImage/NcImage";
import Label from "../../../components/Label/Label";
import Input from "../../../shared/Input/Input";
import PasswordStrengthBar from "../../../shared/password/password-strength-bar";
import ButtonPrimary from "../../../shared/Button/ButtonPrimary";

export const PhotosDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const photosEntity = useAppSelector(state => state.photos.entity);
  return (

      <div className={`nc-PayPage  `} data-nc-id="PayPage">
          <main className="container mt-11 mb-24 lg:mb-32 ">
               <div className="max-w-4xl mx-auto">
                   <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">

                       <div className="flex justify-center flex-row">
                           <i className="las la-3x la-image" />
                           <span className="mt-1.5 text-lg font-semibold"><h2 className="text-3xl lg:text-4xl font-semibold">
                      Image Details
                </h2></span>
                       </div>

                       <div className="border-b border-neutral-200 dark:border-neutral-700"></div>


                       <NcImage

                           className="object-cover w-25 h-25 rounded-md sm:rounded-xl"
                           src={`data:${photosEntity.imageContentType};base64,${photosEntity.image}`}
                           prevImageHorizontal
                       />
                       <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700">
                           <div className="flex-1 p-5 flex space-x-4">
                               {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                               <div className="flex flex-col">
                                   <span className="text-sm text-neutral-400">{photosEntity.caption}</span>

                               </div>
                           </div>
                           <div className="flex-1 p-5 flex space-x-4">
                               {/*<i className="las la-user la-3x text-neutral-300 dark:text-neutral-6000"/>*/}

                               <div className="flex flex-col">
                                   <span className="text-sm text-neutral-400">Cover Image?</span>
                                   <span className="text-sm text-neutral-400">{photosEntity.isCoverImage ? ("Yes"):("No")}</span>

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



                   </div>


               </div>

          </main>
      </div>



  );
};

export default PhotosDetail;
