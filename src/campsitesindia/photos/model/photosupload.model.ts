import {IListing} from '../../listing/model/listing.model';

export interface IUpload {
 message?:string | '',
}

export const defaultValue: Readonly<IUpload> = {
  message:''
};
