import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const FoodItemSchema = mongoose.Schema({
    Item_Name: {type: String, required: true},
    Category : {type: String, required: true},
    Unit_Price : {type: Number, required: true},
    Quantity : {type: Number, required: true},
    Description : {type: String, required: true},
})

autoIncrement.initialize(mongoose.connection);
FoodItemSchema.plugin(autoIncrement.plugin, 'fooditem')

const fooditem = mongoose.model('FoodItems', FoodItemSchema);

export default fooditem;