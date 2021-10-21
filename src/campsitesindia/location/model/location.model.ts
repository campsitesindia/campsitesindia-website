export interface ILocation {
  id?: number;
  title?: string | null;
  count?: number | null;
  thumbnail?: string | null;
  icon?: string | null;
  color?: string | null;
  imgIcon?: string | null;
  description?: string | null;
  taxonomy?: string | null;
  createdBy?: string | null;
  createdDate?: string | null;
  updatedBy?: string | null;
  updateDate?: string | null;
  parent?: ILocation | null;
}

export const defaultValue: Readonly<ILocation> = {};
