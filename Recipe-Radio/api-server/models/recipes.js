"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var RecipeSchema = new mongoose_1.Schema({
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
exports.Recipe = mongoose_1.model('Recipe', RecipeSchema);
exports["default"] = mongoose_1.model("Recipe", RecipeSchema);
