import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const FoodOrderSchema = mongoose.Schema({
    Customer: {type: JSON, required: true},
    cart : {type: Array, required: true},
    status: {type: String, required: true},
    time : {type: Date, required: true},
    totalamount : {type: Number, required: true},
    TableId: {type: Number, required: true},
})

autoIncrement.initialize(mongoose.connection);
FoodOrderSchema.plugin(autoIncrement.plugin, 'foodorder')

const foodorder = mongoose.model('FoodOrders', FoodOrderSchema);

export default foodorder;