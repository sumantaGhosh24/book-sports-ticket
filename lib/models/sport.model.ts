import {Document, Schema, model, models} from "mongoose";

export interface ISport extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  url?: string;
  category: {_id: string; name: string};
  organizer: {_id: string; firstName: string; lastName: string};
}

const SportSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String},
  location: {type: String},
  createdAt: {type: Date, default: Date.now},
  imageUrl: {type: String, required: true},
  startDateTime: {type: Date, default: Date.now},
  endDateTime: {type: Date, default: Date.now},
  price: {type: String},
  url: {type: String},
  category: {type: Schema.Types.ObjectId, ref: "Category"},
  organizer: {type: Schema.Types.ObjectId, ref: "User"},
});

const Sport = models.Sport || model("Sport", SportSchema);

export default Sport;
