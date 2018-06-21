import { Document, Schema, Model, model}  from "mongoose";
import * as Bcrypt from "bcryptjs";
import {IRecipe} from '../interfaces/IRecipe'

export interface IRecipeModel extends IRecipe {

}

var RecipeSchema = new Schema({
  title: { 
  	type: String, 
  	required: true,
    unique: true
  },
  tags: { 
  	type: Array
  },
  ingredients: { 
    type: String, 
    required: true
  },
  image: { 
    type: String
  },
  directions: {
    type: Array
  },
  cooktime: {
   type: String
  }
});

export const Recipe: Model<IRecipeModel> = model<IRecipeModel>('Recipe', RecipeSchema);
export default model("Recipe", RecipeSchema)