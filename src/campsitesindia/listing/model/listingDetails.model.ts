import {IPhotos} from "../../photos/model/photos.model";
import {IFeatures} from "../../features/model/features.model";
import {IListing} from "./listing.model";
import {IReview} from "../../review/model/review.model";
import {IRating} from "../../rating/model/rating.model";

export interface IListingDetails {
  listing?: IListing;
  featureList?: IFeatures[] | null;
  photoList?: IPhotos[] | null;
  reviews?: IReview[]| null;
  ratings: IRating | null;

}


export const defaultValue: Readonly<IListingDetails> = {
     ratings:{
       value:0
     }
};
