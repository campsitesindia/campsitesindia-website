import { IPhotos } from './photos.model';

export interface ITag {
  id?: number;
  name?: string;
  photos?: IPhotos[] | null;
}

export const defaultValue: Readonly<ITag> = {};
