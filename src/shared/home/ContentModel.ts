export interface IContent {
  id?: number | 0;
  img?: string | null;
  title?: string | null;
  description?: string | null;
  amount?: number | null;
  big?: string | null;

}

export const defaultValue: Readonly<IContent> = {};

export const emptyContentModel: IContent = {
  id : 0,
  img : '',
  title:'',
  description:'',
  amount:0,
  big:''
};
