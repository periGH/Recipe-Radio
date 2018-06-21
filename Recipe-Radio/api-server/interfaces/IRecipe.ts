import { Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  tags: Array<string>;
  ingredients: string;
  image: string;
  directions: Array<string>;
  cooktime: string
}
