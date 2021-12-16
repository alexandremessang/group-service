import * as mongoose from 'mongoose';

export interface IGroup {
  name: string;
  type: string;
  img: string;
  members: Array<any>;
}

const groupSchema = new mongoose.Schema<IGroup>(
  {
    name: String,
    type: String,
    img: String,
    members: Array,
  },
);

groupSchema.post<
  {
    name: String,
    type: String,
    img: String,
    members: Array<any>,
  } & {
    save: () => Promise<void>;
  }
>('save', async function (results) {
  
  
});
  
export const Group = mongoose.model('groups', groupSchema);

