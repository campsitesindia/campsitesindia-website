import React, {FC, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
//import InfiniteScroll from 'react-infinite-scroller';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button} from 'reactstrap';
import {getSortState, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {getEntities, reset} from './photos.reducer';
import {ASC, DESC, ITEMS_PER_PAGE} from '../../util/pagination.constants';
import {overridePaginationStateWithQueryParams} from '../../util/entity-utils';
import {useAppDispatch, useAppSelector} from '../../config/store';
import Gallery from "./Gallery";
import BackgroundSection from "../../../components/BackgroundSection/BackgroundSection";
import PageAddListing4, {PageAddListing4Props} from "../../../containers/PageAddListing1/PageAddListing4";
import PageAddListing7 from "../../listing/addlisting/listingsteps/PageAddListing7";
import CommonLayout from "../../../containers/PageAddListing1/CommonLayout";

export interface PhotosProps {
    listingId?:number ;
}


 const Photos:FC<PhotosProps> = ({listingId}) => {
    const dispatch = useAppDispatch();
    require("react/package.json"); // react is a peer dependency.
    const lId=listingId;
    const history = useHistory();
    const addPhotosUrl = "/addphoto/"+lId+"/new"
    const photosList = useAppSelector(state => state.photos.entities);
    const loading = useAppSelector(state => state.photos.loading);
    const totalItems = useAppSelector(state => state.photos.totalItems);

    const getAllEntities = (listingId) => {

        dispatch(
            getEntities({
                query: "listingId.equals="+listingId,

            })
        );
    };



    useEffect(() => {
        getAllEntities(lId);

    },[]  );





    //const srcList: string[];
    const photoSet = photosList.map(photo => {

        //srcList.push(`data:${photo.imageContentType};base64,${photo.image}`)
        return (`data:${photo.imageContentType};base64,${photo.image}`);
    });

    return (
        <CommonLayout
            index="04"
            backtHref="/add-listing-3"
            nextHref="/add-listing-5"
        >
        <div>
            <div className="flex flex-wrap -mx-1 overflow-hidden sm:-mx-3">
                <div className="flex justify-center my-1 px-1 w-full overflow-hidden sm:my-3 sm:px-3 xl:w-full">
                    <div className="d-flex justify-center sm:my-3 sm:px-3">
                    <h1 id="photos-heading"  >
                        <strong>Uploaded Photos</strong>

                    </h1>
                    </div>
                </div>
                <div className="flex justify-end my-1 px-1 w-full overflow-hidden sm:my-3 sm:px-3 xl:w-full">

                    <div className="d-flex justify-content-end sm:my-3 sm:px-3">
                        <button
                            className="
    bg-purple-500
    text-white
    active:bg-purple-600
    font-bold
    uppercase
    text-base
    px-3
    py-3
    rounded-full
    shadow-md
    hover:shadow-lg
    outline-none
    focus:outline-none
    mr-1
    mb-1
    ease-linear
    transition-all
    duration-150
  "
                            type="button"
                            onClick={()=> history.push(addPhotosUrl)}

                        >
                            <i className="las la-plus"></i> Create new Photos
                        </button>

                    </div>
                </div>
                <div className="flex justify-center my-1 px-1 w-full overflow-hidden sm:my-3 sm:px-3 xl:w-full">
                    {photoSet ? (
                        <Gallery key={Math.floor(Math.random() * 1000)} galleryImgs={photoSet}/>
                    ) : (null)
                    }
                </div>

                <div className="flex justify-center my-1 px-1 w-full overflow-hidden sm:my-3 sm:px-3 xl:w-full">
                    <div className="flex  flex-col text-left">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-12">
                                <div
                                    className="
          shadow
          overflow-hidden
          border-b border-gray-200
          sm:rounded-lg
        "
                                >
                                    {photosList && photosList.length > 0 ? (
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >
                                                    ID
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >
                                                    Caption
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >
                                                    Image
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >
                                                    CoverImage
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >
                                                    Uploaded Date
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >
                                                    Created BY
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="
                  px-6
                  py-3
                  text-left text-xs
                  font-medium
                  text-gray-500
                  uppercase
                  tracking-wider
                "
                                                >

                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {photosList.map((photos, i) => (
                                                <tr key={`entity-${i}`}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {photos.id}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                      <span
                                                          className="
                    px-2
                    inline-flex
                    text-xs
                    leading-5
                    font-semibold
                    rounded-full
                    bg-green-100
                    text-green-800
                  "
                                                      >
                                                          {photos.caption}
                </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img
                                                                    className="h-10 w-10 rounded-full"
                                                                    src={`data:${photos.imageContentType};base64,${photos.image}`}
                                                                    alt={photos.caption}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {photos.isCoverImage}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {photos.uploaded}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {photos.createdBy}

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center justify-center mb-4">
                                                            <button
                                                                className="bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                                                type="button"

                                                                onClick={()=> history.push("/photo-detail/"+{listingId}+"/"+photos.id)}
                                                            >
                                                                <i className="las la-eye"></i>
                                                            </button>
                                                            <button
                                                                className="bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                                                type="button"

                                                                onClick={()=> history.push("/photo-update/"+{listingId}+"/"+photos.id)}
                                                            >
                                                                <i className="las la-edit"></i>
                                                            </button>
                                                            <button
                                                                className="bg-purple-500 text-white hover:bg-purple-700 hover:text-white active:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                                                                type="button"
                                                                onClick={()=> history.push("/addphoto/"+{listingId}+"/new")}
                                                            >
                                                                <i className="las la-cut"></i>
                                                            </button>
                                                        </div>
                                                    </td>


                                                </tr>

                                            ))}


                                            </tbody>
                                        </table>
                                    ) : (
                                        (
                                            <div className="alert alert-warning">
                                                <Translate contentKey="campsitesindiaApp.photos.home.notFound">No Photos
                                                    found</Translate>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>




        </div>
        </div>
        </CommonLayout>
    );
};

export default Photos;
