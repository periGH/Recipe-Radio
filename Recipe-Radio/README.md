
# CloudNative JavaScript with Koa.js

## Chapters

***[Ch1 Getting Started with Docker](https://github.com/bigbassroller/cloud-native-javascript-v2/tree/master/ch-1-getting-started-with-docker)***

## JWT Authentication
For JWT authentication we need to create 3 files and adding 3 routes to the routes.ts file.

### Dependencies




# CloudNative JavaScript with Koa.js

## Chapters

***[Ch1 Getting Started with Docker](https://github.com/bigbassroller/cloud-native-javascript-v2/tree/master/ch-1-getting-started-with-docker)***

## Adding Recipes
**api-server/interfaces/IRecipe.ts**
```
import { Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  tags: Array<string>;
  ingredients: string;
  image: string;
  directions: Array<string>;
  cooktime: string
}

```

**api-server/models/recipes.ts**
```
import {Schema, Model, model}  from "mongoose";
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
```

**api-server/controllers/recipes.ts**
```
import User from "../models/recipes"



class RecipesControllers {
  /**
   * Get all data
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await User.find()
  }


  /**
   * Find a recipe
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const data = await User.findById(ctx.params.id)
      if (!data) {
        ctx.throw(404)
      }
      ctx.body = data
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Update a data
   * @param {ctx} Koa Context
   */
  async update(ctx) {
    try {
      const data = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
      if (!data) {
        ctx.throw(404)
      }
      ctx.body = data
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }

  /**
   * Delete a data
   * @param {ctx} Koa Context
   */
  async delete(ctx) {
    try {
      const data = await User.findByIdAndRemove(ctx.params.id)
      if (!data) {
        ctx.throw(404)
      }
      ctx.body = data
    } catch (err) {
      if (err.name === 'CastError' || err.name === 'NotFoundError') {
        ctx.throw(404)
      }
      ctx.throw(500)
    }
  }
}
export default new RecipesControllers()
```


```
...
  // Recipe Routes
  .get('/api/recipes/', RecipesControllers.find)
  .get('/api/recipes/:id', RecipesControllers.findById)
  .post('/api/recipes/', RecipesControllers.add)
  .put('/api/recipes/:id', jwt, RecipesControllers.update)
  .delete('/api/recipes/:id', jwt, RecipesControllers.delete)
...
```




We can add users with our curl command.
```
curl -H "Content-Type: application/json" -X POST -d '{"cooktime": "serves 10 cook time 10 minutes", "directions": ["", "Place the tomatoes, tomato juice, cucumbers, carrots, green and red peppers, onion, and garlic in a food processor and process until smooth.", "Add teh vinegar, lemon juice, paprika, oregno, basil, and pepper and process to combine. ", "Add the Tabasco sauce to taste and blend.", "Chill for several hours.", "", " ", "\u00a0", ""], "image": "http://www.openeats.org//static-files/images/parsley.jpg", "ingredients": "\n 2 teaspoons\n- basil \n 28 ounced\n- canned tomatoes \n 1/2 cup\n- carrots peeled and diced\n 2 1/2 whole\n- cucumbers peeled and diced\n 2 whole\n- garlic cloves \n 3/4 cup\n- green pepper diced\n 1 teaspoon\n- kosher salt \n 1/3 cup\n- lemon juice \n 2 teaspoons\n- oregano \n 1 teaspoon\n- paprika \n 1/4 teaspoon\n- pepper \n 3/4 cup\n- red pepper diced\n 1/3 cup\n- red wine vinegar \n 1/4 teaspoon\n- tabasco sauce \n 3 cups\n- tomato juice \n", "tags": ["italian"], "title": "Gazpacho Soup "}, "8110": {"cooktime": "serves 4 cook time 35 minutes", "directions": ["Pre-heat oven to 375 degres", "Stuffing", "", "Combine the feta and blue cheese with the spinach, sun dried tomato's, garlic and olive oil.", "", "", "Pound the chicken breast flat", "Dip the chicken breast in the egg, making sure the breast are covered in the egg.", "Roll the chicken breast in the bread crumbs", "Place the stuffing mixture in the middle of the flattened chicken breast and fold the breast over", "Place the chicken breast in the stove and cook for about 35 mins.", "", ""], "image": "http://www.openeats.org//static-files/images/parsley.jpg", "ingredients": "\n 1/2 cup\n- blue cheese crumbled\n 4 whole\n- chicken breast skinless\n 2 tablespoons\n- crushed garlic \n 1 whole\n- egg beating\n 1/2 cup\n- feta cheese crumbled\n 1 cup\n- Italian bread crumbs \n 2 teaspoons\n- olive oil \n 1 package\n- spinach fresh\n 1/4 cup\n- sun dried tomatos diced\n", "tags": ["american"], "title": "Feta Stuffed Chicken Breast "}, "8990": {"cooktime": "serves 4 cook time 25 minutes", "directions": [" ", "Rinse shrimp and drain well", "Heat soy sauce, vinegar, and 4 tablespoons of the chicken broth in a saute pan", "Add Garlic and ginger and saute until tender", "Add all the vegetables to the pan and continue to saute adding more broth as necessary", "Add the shrimp when the vegetables are halfway cooked and then cook till the vegetables are tender and the shrimp are opaque server over brown rice", "\u00a0", ""], "image": "http://www.openeats.org//static-files/images/parsley.jpg", "ingredients": "\n 1 1/2 cup\n- broccoli \n 1 package\n- brown rice \n 3 cups\n- button mushrooms \n 1 cup\n- chicken broth fat free\n 1 teaspoon\n- garlic minced from jar\n 1 teaspoon\n- ginger minced in jar\n 1 whoie\n- red onion sliced wedges\n 1 1/2 teaspoons\n- rice vinegar \n 16 ounces\n- shrimp peeled\n 1 1/2 cup\n- snow peas \n 1 tablespoon\n- soy sauce low sodium\n 1 cup\n- water chesnuts \n 1 whole\n- yellow bell pepper cubed\n", "tags": ["chinese"], "title": "Light Shrimp Stir Fry "}' http://api-server:4000/api/recipes
```







## Useful Docker Commands

### run docker-compose with specific docker-compose file:<br>
`docker-compose -f docker-compose.dev.yml up -d --build`<br>

### See running processes:
`docker ps`

### Stop container:
`docker stop container_name/container_id`

### Stop all containers:
`docker kill $(docker ps -q)`

### Remove all containers:
`docker rm $(docker ps -a -q)`

### List images:
`docker images`

### Remove image:
`docker rmi image_id`

### Remove all docker images:
`docker rmi $(docker images -q)`

### Remove everything:
`docker kill $(docker ps -q) && docker rm $(docker ps -a -q) && docker rmi $(docker images -q)`

### Drop collection from mongo:
`docker exec -it  mongo-db mongo mongo-db --eval 'db.users.drop()'`

### Add user with curl:<br>
`curl -H "Content-Type: application/json" -X POST -d '{"username":"mikeemike", "email":"mikeemike@mikeemike.com", "password":"shh-secret"}' http://api-server:4000/api/users`

### Network prune:
`docker network prune`