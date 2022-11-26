import mongoose from "mongoose";
import autoIncrement from "mongoose-auto-increment";

const TableSchema = mongoose.Schema({
    Table_No: {type: Number, required: true},
    Seating_Capacity: {type: Number, required: true},
    Description: {type: String, required: true},
    QR_Url : {type: Object, required: true, unique: true},
})

autoIncrement.initialize(mongoose.connection);
TableSchema.plugin(autoIncrement.plugin, 'table')

const table = mongoose.model('tables', TableSchema);

export default table;