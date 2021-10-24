import {IListing} from '../../listing/model/listing.model';


export interface IReview {
  id?: number;
  rating?: number | null;
  reviewbBody?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  updatedBy?: string | null;
  updateDate?: string | null;
  listing?: IListing | null;
 // booking?: IBookings | null;
}

export const defaultValue: Readonly<IReview> = {};
