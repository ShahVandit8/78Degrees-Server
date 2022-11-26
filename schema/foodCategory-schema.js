import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const FoodCategorySchema = mongoose.Schema({
    Category: {type: String, required: true},
    Description: {type: String, required: true},
})

autoIncrement.initialize(mongoose.connection);
FoodCategorySchema.plugin(autoIncrement.plugin, 'category')

const foodCategory = mongoose.model('FoodCategory', FoodCategorySchema);

export default foodCategory;