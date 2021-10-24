import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {getSortState} from 'react-jhipster';

import {getEntities} from './listing.reducer';
import {ASC, DESC, ITEMS_PER_PAGE, SORT} from '../../util/pagination.constants';
import {overridePaginationStateWithQueryParams} from '../../util/entity-utils';
import {useAppDispatch, useAppSelector} from '../../config/store';
import {emptyTaxonomyType, StayDataType} from "../../../data/types";
import SectionGridFeaturePlaces from "../../../containers/PageHome/SectionGridFeaturePlaces";


export const Listing = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
  );

  const listingList = useAppSelector(state => state.listing.entities);
  const loading = useAppSelector(state => state.listing.loading);
  const totalItems = useAppSelector(state => state.listing.totalItems);
    let data:StayDataType[]=[]
  const getAllEntities = () => {

    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
      console.log("listing......................")
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
      console.log("listing1......")
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get(SORT);

    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  useEffect(()=>
  {
      data=objectMap(listingList);
  },[loading])

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };



  const { match } = props;
    function objectMap(listings) {

        console.log(listings)
        let cats :StayDataType[]=[]
        for (let [k, v] of Object.entries(listings)) {
            let newObj1 = listings[k]
            let photosList:string[]=[]


                newObj1.photosList.map((photo) => {
                    console.log(photo)
                    photosList.push(photo.href)
                })

            let rating = 0
            if ( newObj1.ratings!==null){
                rating=newObj1.ratings.value;
            }
            //photosByListing(newObj1.id).then((value) => { photos= value})
           // console.log("values listing:::..............."+listings[k].listingType)
            let stayData:StayDataType= {
                id: newObj1.listing.id,
            author: newObj1.listing.owner,
            date: newObj1.listing.createdDate,
            href: '/listing-stay-detail/'+newObj1.listing.id,
            title: newObj1.listing.title,
            featuredImage: newObj1.listing.thumbnail,
            commentCount: 10,
            viewCount: newObj1.listing.viewCount,
            address: newObj1.listing.address,
            reviewStart: rating,
            reviewCount: newObj1.reviews.length,
            like: false,
            galleryImgs:photosList,
            //galleryImgs: ['https://images.pexels.com/photos/5191371/pexels-photo-5191371.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'], // from photos API
           // galleryImgs: photos,
                price: newObj1.listing.pricePerPerson,
            listingCategory: emptyTaxonomyType,
            maxGuests: 10,
            bedrooms: 2,
            bathrooms: 1,
            saleOff: null,
            isAds:  false,
            map: {
                lat: newObj1.listing.latitude,
                lng: newObj1.listing.longitude,
            },

            };
            cats.push(stayData)
            // console.log("listing::::::" + k + stayData.title+"   "+cats.length)
            // console.log(newObj1)

        }
        return cats;

    }
  return (
      <div>
      {listingList && listingList.length > 0 &&
      <SectionGridFeaturePlaces key={Math.floor(Math.random() * 6000) } stayListings={ objectMap(listingList)}/>
      }
      </div>


  );
};

export default Listing;
