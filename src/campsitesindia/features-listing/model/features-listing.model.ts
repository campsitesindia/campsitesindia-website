import { IListing } from '../../listing/model/listing.model';
import { IFeatures } from '../../features/model/features.model';

export interface IFeaturesListing {
  id?: number;
  listing?: IListing | null;
  feature?: IFeatures | null;
}

export const defaultValue: Readonly<IFeaturesListing> = {};
