import React, {FC, useState, forwardRef, useEffect,} from "react";

import {RMIUploader} from "react-multiple-image-uploader";
import {useAppDispatch, useAppSelector} from "../../config/store";
import {IListing} from "../model/listing.model";
import CommonLayout from "../../../containers/PageAddListing1/CommonLayout";
import {useHistory} from "react-router";
import {createEntity, deleteEntity, getEntities} from "../../photos/redux/photos.reducer";
import {IPhotos} from "../../photos/model/photos.model";
import {displayDefaultDateTime} from "../../util/date-utils";

export interface AddingPhotosForListingProps {

    listingId:number;

}

const AddingPhotosForListing:  FC<AddingPhotosForListingProps> = ({listingId}) => {
    const dispatch = useAppDispatch();

    require("react/package.json"); // react is a peer dependency.
    let lId=0;
    if(listingId!==undefined  ) {
        lId = listingId;

    }

    const photosList = useAppSelector(state => state.photos.entities);
    const loading = useAppSelector(state => state.photos.loading);
    const success = useAppSelector(state => state.photos.updateSuccess);
    const totalItems = useAppSelector(state => state.photos.totalItems);
    const account = useAppSelector(state => state.authentication.account);

    const getAllEntities = (listId) => {

        dispatch(
            getEntities({
                query: "listingId.equals="+listId,

            })
        );
    };



    useEffect(() => {

        getAllEntities(lId);


    },[success]  );


    const photoSet = photosList.map(photo => {

        //srcList.push(`data:${photo.imageContentType};base64,${photo.image}`)
        return ({id:photo.id,
            dataURL:`data:${photo.imageContentType};base64,${photo.image}`
        });
    });


    //const srcList: string[];



    const [visible, setVisible] = useState(false);
    const handleSetVisible = () => {
        setVisible(true);
    };
    const hideModal = () => {
        setVisible(false);
    };
    const onUpload = (data) => {
        console.log("Upload files", data);
        data.map((photoSrc,index) => {
            const photosEntity = {} as IPhotos
            let listing: IListing = {}
            listing.id = Number(lId)
            photosEntity.imageContentType = photoSrc.dataURL.split(",")[0]
            photosEntity.image = photoSrc.dataURL.split(",")[1];
            photosEntity.caption = "";
            photosEntity.isCoverImage = false;
            photosEntity.taken = displayDefaultDateTime();
            photosEntity.uploaded = displayDefaultDateTime();
            photosEntity.createdDate = displayDefaultDateTime()
            photosEntity.createdBy = account.name
            photosEntity.updateDate = displayDefaultDateTime()
            photosEntity.listing = listing
            console.log(photosEntity)
            dispatch(createEntity(photosEntity));
        });

    };
    const onSelect = (data) => {

        console.log("Select files", data);
    };
    const onRemove = (id) => {
        console.log("Remove image id", id);
        dispatch(deleteEntity(id))
    };

    return (
        <CommonLayout
            index="07"
            backtHref="/add-listing-6"
            nextHref="/add-listing-8"
        >

            <RMIUploader

                onSelect={onSelect}
                onUpload={onUpload}
                onRemove={onRemove}
                dataSources={photoSet}
                warnMessage={""}
            />
        </CommonLayout>
    );
};

export default AddingPhotosForListing;
